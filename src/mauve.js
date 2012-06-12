/**
 * @preserve Mauve.js 0.1.0 Pre-Alpha
 * Copyright 2012, James Ward
 * Licensed under the MIT license.
 */
/*jshint proto:true, browser:true*/
/*global Node:false*/
window['$'] = (function() {
    'use strict';
    var document = window.document;
    var arr = Array;
    var emptyArray = [];
    var slice = emptyArray.slice;
    var splice = emptyArray.splice;
    var documentReadyStates = ['complete', 'loaded', 'interactive'];
    var documentNodeTypes = [1, 9, 11];
    var divNode = document.createElement('div');
    var divStyle = getComputedStyle(divNode);
    var fragmentDivNode = divNode.cloneNode(false);
    var cssDimensions = [{
        value: 'BOXSIZING'
    }, {
        value: 'CONTENT'
    }, {
        value: 'PADDING'
    }, {
        value: 'BORDER'
    }, {
        value: 'MARGIN'
    }];
    var cssBoxSizings = {
        'content-box': 1,
        'padding-box': 2,
        /* gecko-only and endangered =( */
        'border-box': 3
    };
    var boxSizingPropertyName;
    var bsn = ['-webkit-box-sizing', '-moz-box-sizing', 'box-sizing'];
    var bsi = bsn.length;
    while (bsi--) {
        boxSizingPropertyName = divStyle.getPropertyValue(bsn[bsi]);
        if (typeof(boxSizingPropertyName) === 'string') {
            boxSizingPropertyName = bsn[bsi];
        }
        break;
    }
    var matchesSelector = '';
    var msn = ["msMatchesSelector", "oMatchesSelector", "mozMatchesSelector", "webkitMatchesSelector", "matchesSelector"];
    var msi = msn.length;
    while (msi--) {
        matchesSelector = divNode[msn[msi]];
        if (matchesSelector) {
            matchesSelector = msn[msi];
            break;
        }
    }
    var idSelectorRE = /^#([\w\-]+)$/;
    var classSelectorRE = /^\.([\w\-]+)$/;
    var tagSelectorRE = /^[\w\-]+$/;
    var fragmentRE = /^\s*<(\w+|!)[^>]*>/;

    // camelization from Zepto but rewritten with RE and fn definitions moved out
    var camelizeRE = /-+(.)/g;
    var camelizeFn = function(match, chr) {
            return chr ? chr.toUpperCase() : '';
        };
    var camelize = function(str) {
            return str.replace(camelizeRE, camelizeFn);
        };

    /**
     * The following functions are used by passing them in as parameters to map, forEach, filter etc.
     */
    /**
     * filter functions
     * @param {Node} el the node to filter
     * @param {Anything} this context; function-dependent
     * @return {Anything} truthy if the node should pass through the filter, falsy otherwise
     */
    /**
     * $truthy filter out falsy values
     */
    var $truthy = function(el) {
            return el;
        };

    /**
     * $uniq filter out duplicates
     */
    var $uniq = function(el, idx, array) {
            return array.indexOf(el) === idx;
        };

    /**
     * $truthyAndUniq filter out falsy and duplicate values
     */
    var $truthyAndUniq = function(el, idx, array) {
            return el && array.indexOf(el) === idx;
        };

    /**
     * $nodeType filter out nodes with the wrong node types
     */
    var $nodeType = function(el) {
            return documentNodeTypes.indexOf(el.nodeType) !== -1;
        };

    /**
     * $nodeTypeAndExcept filter out nodes with the wrong node types and nodes in this
     */
    var $nodeTypeAndExcept = function(el) {
            return documentNodeTypes.indexOf(el.nodeType) !== -1 && this.indexOf(el) !== -1;
        };

    /**
     * $matchesSelector filter out nodes which do not match the selector provided in this
     */
    var $matchesSelector = function(el) {
            return el[matchesSelector] ? el[matchesSelector](this) : false;
        };


    /**
     * $fromUnknown apply all the filters!
     */
    var $fromUnknown = function(el, idx, array) {
            return typeof el === 'object' && documentNodeTypes.indexOf(el.nodeType) !== -1 && array.indexOf(el) === idx;
        };

    /**
     * reduce functions
     * @param {Array} a the left array
     * @param {Array} b thr right array
     * @return {Array} the array resulting from reducing a and b
     */
    /* reductions: return a plain array */
    var $concat = function(a, b) {
            return a.concat(b);
        };

    /**
     * map functions.
     * functions that return elements or arrays of elements are a bit special
     * @param {Node} el the element to map
     * @param {Anything} this some context
     * @return {Anything} the result of mapping el
     */
    /**
     * Return an array of the descendants of el that match the query in this
     */
    var $queryAll = function(el) {
            return slice.call(el.querySelectorAll(this), 0);
        };

    /**
     * Return the first descendant of el that matches the query in this
     */
    var $query = function(el) {
            return el.querySelector(this);
        };

    /**
     * Return a deep clone of el
     */
    var $deepclone = function(el) {
            return el.cloneNode(true);
        };

    /**
     * Return the direct child elements of el
     */
    var $children = function(a) {
            return slice.call(a.childNodes, 0);
        };

    /**
     * Return an array containing the siblings of el (including el itself) if el has a parent, [null] otherwise
     */
    var $siblings = function(el) {
            return slice.call(el.parentNode && el.parentNode.childNodes, 0);
        };

    /**
     * Return the direct parent of el or null
     */
    var $parent = function(el) {
            return el.parentNode;
        };

    /**
     * return an array of all of the parents of el
     */
    var $parents = function(el) {
            var parents = arr(),
                parentNode = el.parentNode;
            while (parentNode && parentNode !== document) {
                parents.push(parentNode);
                el = parentNode;
                parentNode = parentNode.parentNode;
            }
            return parents;
        };

    /**
     * Return the computed value of the css property this or the style value
     */
    var $getCss = function(el) {
            return getComputedStyle(el).getPropertyValue(this) || el.style[camelize(this)];
        };

    /* foreaches: modify; no return value */
    var $remove = function(el) {
            if (el.parentNode) {
                el.parentNode.removeChild(el);
            }
        };

    var $reverseAppendNode = function(el) {
            this.appendChild(el);
        };
    var $reversePrependNode = function(el, idx) {
            if (el.childNodes.length) {
                this.insertBefore(el, this.childNodes[idx]);
            } else {
                this.appendChild(el);
            }
        };
    var $reverseAfterNode = function(el) {
            this.parentNode.insertBefore(el, this.nextSibling);
        };
    var $reverseBeforeNode = function(el) {
            var parent = el.parentNode;
            if (parent) {
                parent.insertBefore(el, this);
            }
        };


    var $addClass = divNode.classList ?
    function(el) {
        var list = this.split(' '),
            i = list.length;
        while (i--) {
            el.classList.add(list[i]);
        }
    } : function(el) {
        // TODO IF Android < 3 support is not required, just use classList
        el.className = (el.className + ' ' + this).split(' ').filter($uniq).join(' ');
    };


    var $removeClass = divNode.classList ?
    function(el) {

        var list = this.split(' '),
            i = list.length;

        while (i--) {
            el.classList.remove(list[i]);
        }
    } : function(el) {
        // ditto addClass
        var current = el.className.split(' '),
            torem = this.split(' '),
            i = current.length;

        while (i--) {
            if (torem.indexOf(current[i] !== -1)) {
                current.splice(i, 1);
            }
        }
        el.className = current.join(' ');
    };

    var $setAttribute = function(el) {
            el.setAttribute(this[0], this[1]);
        };

    var $setProperty = function(el) {
            el[this[0]] = this[1];
        };

    var $setValue = function(el) {
            el.value = this;
        };

    var $setCss = function(el) {
            if (this[1]) {
                el.style.setProperty(this[0], this[1], this[2] ? 'important' : undefined);
            } else {
                el.style.removeProperty(this[0]);
            }
        };

    var $setText = function(el) {
            el.textContent = this;
        };

    var $setWidth = function(el) {
            el.style.width = this;
        };

    var $setHeight = function(el) {
            el.style.height = this;
        };

    var $prev = function(el) {
            var parent = el.parentNode,
                siblings, i;
            if (parent) {
                siblings = slice.call(parent.childNodes, 0).filter($nodeType);
                i = siblings.indexOf(el);
                while (i--) {
                    if (typeof(this) === 'string' && siblings[i][matchesSelector]) {
                        if (siblings[i][matchesSelector](this)) {
                            return siblings[i];
                        }
                    } else {
                        return siblings[i];
                    }
                }
            }
        };

    var $next = function(el) {
            var parent = el.parentNode,
                siblings, i, max;
            if (parent) {
                siblings = slice.call(parent.childNodes, 0).filter($nodeType);
                i = siblings.indexOf(el);
                max = siblings.length;
                while (++i < max) {
                    if (typeof(this) === 'string' && siblings[i][matchesSelector]) {
                        if (siblings[i][matchesSelector](this)) {
                            return siblings[i];
                        }
                    } else {
                        return siblings[i];
                    }
                }
            }
        };

    var $hide = function(el) {
            el.style.display = 'none';
        };

    var $show = function(el) {
            // note that this is different from Zepto, which uses the default display
            // value for an element of the same nodeName
            el.style.display = '';
        };

    /* query selectors: optimized for ids, classes and tags */
    var qsa = function(selector, context) {
            var match = idSelectorRE.exec(selector);
            context = context || document;
            if (match) {
                return arr(context.getElementById(match[1]));
            }
            match = classSelectorRE.exec(selector);
            if (match) {
                return slice.call(context.getElementsByClassName(match[1]), 0);
            }
            match = tagSelectorRE.exec(selector);
            if (match) {
                return slice.call(context.getElementsByTagName(match[0]), 0);
            }
            return slice.call(context.querySelectorAll(selector));
        };

    var qs = function(selector, context) {
            var match = idSelectorRE.exec(selector);
            context = context || document;
            if (match) {
                return context.getElementById(match[1]);
            }
            match = classSelectorRE.test(selector);
            if (match) {
                return context.getElementsByClassName(match[1])[0];
            }
            match = tagSelectorRE.test(selector);
            if (match) {
                return context.getElementsByTagName(match[0])[0];
            }
            return context.querySelector(selector);
        };

    var getElementById = function(selector, context) {
            return context.getElementById(selector);
        };
    var getElementByClassName = function(selector, context) {
            return context.getElementsByClassName(selector)[0];
        };
    var getElementsByClassName = function(selector, context) {
            return context.getElementsByClassName(selector);
        };
    var getElementByTagName = function(selector, context) {
            return context.getElementsByTagName(selector)[0];
        };
    var getElementsByTagName = function(selector, context) {
            return context.getElementsByTagName(selector);
        };
    var getElementByQuery = function(selector, context) {
            return context.querySelector(selector);
        };
    var getElementsByQuery = function(selector, context) {
            return context.querySelectorAll(selector);
        };

    var hasClass = divNode.classList ?
    function(el, className) {
        return el.classList.contains(className);
    } : function(el) {
        return el.className.split(' ').indexOf(className) !== -1;
    };

    var mauve = function(arr) {
            // mauve is a sublcass of Array.
            // this is the way to do it iff we can write to __proto__; no copying required!
            arr.__proto__ = mauve.prototype;
            return arr;
        };
    mauve.prototype = Object.create(arr.prototype);

    var mauvefn = mauve.prototype;

    mauvefn.findFirst = function(selector) {
        var i = 0,
            max = this.length,
            result, match, queryfn;
        match = idSelectorRE.exec(selector);
        if (match) {
            match = match[1];
            queryfn = getElementById;
        } else {
            match = classSelectorRE.test(selector);
            if (match) {
                match = match[1];
                queryfn = getElementByClassName;
            } else {
                match = tagSelectorRE.test(selector);
                if (match) {
                    match = match[0];
                    queryfn = getElementByTagName;
                } else {
                    match = selector;
                    queryfn = getElementByQuery;
                }
            }
        }
        while (i < max) {
            result = queryfn(match, this[i]);
            if (result) {
                return mauve(arr(result));
            }
            i += 1;
        }
        return mauve(arr());
    };

    mauvefn.find = function(selector) {
        if (this.length === 1) {
            return mauve(arr($queryAll.call(selector, this[0])));
        } else {
            return mauve(this.map($queryAll, selector).reduce($concat).filter($uniq));
        }
    };

    mauvefn.add = function(selector, context) {
        return mauve(this.concat($(selector, context)).filter($uniq));
    };

    mauvefn.remove = function() {
        this.forEach($remove);
        return this;
    };

    var insertFns = {
        appendhtml: function(el) {
            el.innerHTML += this;
        },
        appendNode: function(el) {
            el.appendChild(this);
        },
        appendNodes: function(el) {
            this.forEach($reverseAppendNode, el);
        },
        prependhtml: function(el) {
            el.innerHTML = this + el.innerHTML;
        },
        prependNode: function(el) {
            if (el.childNodes.length) {
                el.insertBefore(this, el.childNodes[0]);
            } else {
                el.appendChild(this);
            }
        },
        prependNodes: function(el) {
            this.forEach($reversePrependNode, el);
        },
        afterhtml: function(el) {
            el.outerHTML += this;
        },
        afterNode: function(el) {
            el.parentNode.insertBefore(this, el.nextSibling);
        },
        afterNodes: function(el) {
            this.forEach($reverseAfterNode, el);
        },
        beforehtml: function(el) {
            el.outerHTML = this + el.outerHTML;
        },
        beforeNode: function(el) {
            var parent = el.parentNode;
            if (parent) {
                parent.insertBefore(this, el);
            }
        },
        beforeNodes: function(el) {
            this.forEach($reverseBeforeNode, el);
        }
    };
    ['append', 'prepend', 'after', 'before'].forEach(function(where) {
        var withHTML = insertFns[where + 'html'];
        var withNode = insertFns[where + 'Node'];
        var withNodes = insertFns[where + 'Nodes'];
        mauvefn[where] = function(stuff) {
            if (typeof(stuff) === 'string') {
                this.forEach(withHTML, stuff);
            } else if (stuff instanceof Node) {
                this.forEach(withNode, stuff);
            } else if (stuff instanceof arr) {
                this.forEach(withNodes, stuff);
            } else if (context instanceof NodeList || context instanceof HTMLCollection || context instanceof NamedNodeMap) {
                stuff = slice.call(stuff, 0);
                this.forEach(withNodes, stuff);
            }
            return this;
        };
    });

    mauvefn.addClass = function(c) {
        this.forEach($addClass, c);
        return this;
    };

    mauvefn.removeClass = function(c) {
        this.forEach($removeClass, c);
        return this;
    };

    mauvefn.hasClass = function(c) {
        return this[0] ? hasClass(this[0], c) : false;
    };

    mauvefn.attr = function(name, value) {
        if (value === undefined) {
            return this[0] ? this[0].getAttribute(name) : undefined;
        } else {
            // using arguments here is faster than using arr(name, value)
            this.forEach($setAttribute, arguments);
            return this;
        }
    };

    mauvefn.prop = function(name, value) {
        if (value === undefined) {
            return this[0] ? this[0][name] : undefined;
        } else {
            this.forEach($setProperty, arguments);
            return this;
        }
    };

    mauvefn.val = function(value) {
        if (value === undefined) {
            return this[0] ? this[0].value : undefined;
        } else {
            this.forEach($setValue, value);
            return this;
        }
    };

    mauvefn.css = function(name, value, important) {
        var keys, key, i, a;
        if (typeof(name) === 'string') {
            if (value === undefined) {
                return this.map($getCss, name);
            } else {
                this.forEach($setCss, arguments);
            }
        } else if (typeof(name) === 'object') {
            // this does a forEach on the collection for each css property
            // rather than passing the object or a preprocessed 2array to the forEach
            // TODO: profiling!
            keys = Object.keys(name);
            i = keys.length;
            a = arr(2);
            while (i--) {
                key = keys[i];
                a[0] = key;
                a[1] = name[key];
                this.forEach($setCss, a);
            }
        }
        return this;
    };

    mauvefn.children = function() {
        return mauve(this.map($children).reduce($concat).filter($nodeType));
    };

    mauvefn.siblings = function(selector) {
        var result = this.map($siblings).reduce($concat).filter($nodeTypeAndExcept, this);
        return mauve((typeof(selector) === 'string') ? result.filter($matchesSelector, selector) : result);
    };

    mauvefn.parent = function() {
        return mauve(this.map($parent).filter($uniq));
    };

    mauvefn.parents = function() {
        return mauve(this.map($parents).reduce($concat).filter($uniq));
    };

    mauvefn.prev = function(selector) {
        return mauve(this.map($prev, selector).filter($truthyAndUniq));
    };

    mauvefn.next = function(selector) {
        return mauve(this.map($next, selector).filter($truthyAndUniq));
    };

    mauvefn.clone = function() {
        return mauve(this.map($deepclone));
    };

    mauvefn.is = function(selector) {
        var node = this[0];
        return node && (node[matchesSelector] ? node[matchesSelector](selector) : false);
    };

    mauvefn.closest = function(selector, context) {
        var node = this[0];
        if (typeof(context) === 'string') {
            context = qs(context, undefined);
        } else if (context instanceof mauve) {
            context = context[0];
        } else if (context instanceof arr) {
            context = context.filter($fromUnknown)[0];
        } else if (context instanceof NodeList || context instanceof HTMLCollection || context instanceof NamedNodeMap) {
            context = slice.call(context, 0).filter($nodeType)[0];
        }
        while (node && !(node[matchesSelector] ? node[matchesSelector](selector) : false)) {
            node = node !== context && node !== document && node.parentNode;
        }
        return node ? mauve(arr(node)) : mauve(arr());
    };

    mauvefn.text = function(text) {
        if (text === undefined) {
            return this[0] ? this[0].textContent : undefined;
        }
        this.forEach($setText, text);
        return this;
    };

    mauvefn.eq = function(index) {
        if (this.length) {
            if (index >= 0) {
                return mauve(arr(this[index] || this[index % this.length]));
            } else if (index < 0) {
                return mauve(arr(this[this.length + index] || this[(-index) % this.length]));
            }
        }
        return mauve(arr());
    };

    mauvefn.first = function() {
        if (this.length) {
            return mauve(arr(this[0]));
        } else {
            return mauve(arr());
        }
    };

    mauvefn.get = function(index) {
        if (typeof(index) === 'number') {
            if (index >= 0) {
                return this[index] || this[index % this.length];
            } else if (index < 0) {
                return this[this.length + index] || this[(-index) % this.length];
            }
            return undefined;
        }
        return slice.call(this);
    };

    mauvefn.width = function(value) {
        var node, style, dimIndex, result;
        if (value === undefined || cssDimensions.indexOf(value) !== -1) {
            node = this[0];
            // thanks to ryanve for window/document handling
            if (node === window) {
                return document.documentElement.clientWidth;
            } else if (node === document) {
                return Math.max(document.documentElement.offsetWidth, document.documentElement.scrollWidth);
            } else if (node) {
                style = getComputedStyle(node);
                dimIndex = cssDimensions.indexOf(value);
                if (dimIndex <= 0) {
                    dimIndex = cssBoxSizings[style.getPropertyValue(boxSizingPropertyName)];
                }
                result = style.offsetWidth;
                if (dimIndex === 1) {
                    result -= (parseFloat(style.getPropertyValue('padding-left')) + parseFloat(style.getPropertyValue('padding-right')));
                }
                if (dimIndex === 4) {
                    result += (parseFloat(style.getPropertyValue('margin-left')) + parseFloat(style.getPropertyValue('margin-right')));
                } else if (dimIndex < 3) {
                    result -= (parseFloat(style.getPropertyValue('border-left-width')) + parseFloat(style.getPropertyValue('border-right-width')));
                }
                return isNaN(result) ? null : result;
            } else {
                return null;
            }
        } else {
            this.forEach($setWidth, value);
        }
    };

    mauvefn.height = function(value) {
        var node, style, dimIndex, result;
        if (value === undefined || cssDimensions.indexOf(value) !== -1) {
            node = this[0];
            if (node === window) {
                return document.documentElement.clientHeight;
            } else if (node === document) {
                return Math.max(document.documentElement.offsetHeight, document.documentElement.scrollHeight);
            } else if (node) {
                style = getComputedStyle(node);
                dimIndex = cssDimensions.indexOf(value);
                if (dimIndex <= 0) {
                    dimIndex = cssBoxSizings[style.getPropertyValue(boxSizingPropertyName)];
                }
                result = node.offsetHeight;
                if (dimIndex === 1) {
                    result -= (parseFloat(style.getPropertyValue('padding-top')) + parseFloat(style.getPropertyValue('padding-bottom')));
                }
                if (dimIndex === 4) {
                    result += (parseFloat(style.getPropertyValue('margin-top')) + parseFloat(style.getPropertyValue('margin-bottom')));
                } else if (dimIndex < 3) {
                    result -= (parseFloat(style.getPropertyValue('border-top-width')) + parseFloat(style.getPropertyValue('border-bottom-width')));
                }
                return isNaN(result) ? null : result;
            } else {
                return null;
            }
        } else {
            this.forEach($setHeight, value);
        }
    };

    mauvefn.hide = function() {
        this.forEach($hide);
        return this;
    };

    mauvefn.show = function() {
        this.forEach($show);
        return this;
    };

    var $ = function(query, context) {
            if (typeof(query) === 'string') {
                if (fragmentRE.test(query)) {
                    return $.fragment(query);
                } else {
                    return $.queryAll(query, context);
                }
            } else if (query instanceof mauve) {
                return query;
            } else if (query instanceof arr) {
                return mauve(query.filter($fromUnknown));
            } else if (context instanceof NodeList || context instanceof HTMLCollection || context instanceof NamedNodeMap) {
                return mauve(slice.call(query).filter($nodeType));
            } else if (query instanceof Node && documentNodeTypes.indexOf(query.nodeType) !== -1) {
                return mauve(arr(query));
            } else if (typeof(query) === 'function') {
                if (documentReadyStates.indexOf(document.readyState) !== -1) {
                    query($);
                } else {
                    document.addEventListener('DOMContentLoaded', function() {
                        query($);
                    }, false);
                }
                return this;
            } else if (query === window) {
                return mauve(arr(query));
            } else {
                return mauve(arr());
            }
        };

    $.queryAll = function(query, context) {
        if (context) {
            if (typeof(context) === 'string') {
                // $.query('.bar', '.foo') is the same as $('.foo').find('.bar')
                return $(context, undefined).find(query);
            } else if (context instanceof mauve) {
                // $.query('.bar', [mauve]) is the same as [mauve].find('.bar')
                return context.find(query);
            } else if (context instanceof arr) {
                // $.query('.bar', [array]) is the same as mauve([array]).find('.bar')
                return mauve(context.filter($fromUnknown)).find(query);
            } else if (context instanceof NodeList || context instanceof HTMLCollection || context instanceof NamedNodeMap) {
                return mauve(slice.call(context).filter($nodeType)).find(query);
            } else if (context instanceof Node && documentNodeTypes.indexOf(context.nodeType) !== -1) {
                return mauve(qsa(query, context));
            } else {
                return mauve(arr());
            }
        } else {
            return mauve(qsa(query, document));
        }
    };

    $.query = function(query, context) {
        if (context) {
            if (typeof(context) === 'string') {
                // $.query('.bar', '.foo') is the same as $('.foo').find('.bar')
                return $(context, undefined).findFirst(query);
            } else if (context instanceof mauve) {
                // $.query('.bar', [mauve]) is the same as [mauve].find('.bar')
                return context.findFirst(query);
            } else if (context instanceof arr) {
                // $.query('.bar', [mauve]) is the same as [mauve].find('.bar')
                return mauve(context.filter($fromUnknown)).findFirst(query);
            } else if (context instanceof NodeList || context instanceof HTMLCollection || context instanceof NamedNodeMap) {
                return mauve(slice.call(context).filter($nodeType)).findFirst(query);
            } else if (context instanceof Node && documentNodeTypes.indexOf(context.nodeType) !== -1) {
                return mauve(arr(qs(query, context)));
            } else {
                return mauve(arr());
            }
        } else {
            return mauve(arr(qs(query, document)));
        }
    };

    $.fragment = function(html) {
        fragmentDivNode.innerHTML = html;
        html = mauve(slice.call(fragmentDivNode.childNodes).filter($nodeType));
        fragmentDivNode.innerHTML = '';
        return html;
    };

    $.slice = function(instance, begin, end) {
        return mauve(slice.call(instance, begin, end));
    };

    $.splice = function(instance, index, howMany) {
        return mauve(splice.call(instance, index, howMany));
    };

    $.fn = mauvefn;

    $.dimensions = {
        'BOXSIZING': cssDimensions[0],
        'CONTENT': cssDimensions[1],
        'PADDING': cssDimensions[2],
        'BORDER': cssDimensions[3],
        'MARGIN': cssDimensions[4]
    };

    $.version = '0.1.0-prealpha-edge';

    $.noConflict = function() {
        if (window['$'] === $) {
            delete window['$'];
        }
        return $;
    };

    return $;
}());