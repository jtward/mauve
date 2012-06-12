mauve.js
=====

Mauve is a JavaScript library similar to jQuery / Zepto core for modern browsers.
Mauve currently minifies in Google Closure Compiler's advanced mode without warnings and passes JSHint.

#Goals

- Be fast
- Be readable
- Be small
- Be familiar to jQuery / Zepto users
- Be free to depart from the jQuery / Zepto API
- Be well documented, especially where departing from the jQuery or Zepto API

#API
###$
`$(selector, [context]) => mauve array`

Return a mauve array which contains all of the nodes in the document which match the selector string.
If a context is given, the selection is limited to descendants of the nodes represented by the context.
Pseudo-selectors (such as `:before`) are not supported because they are not valid as parameters to `document.querySelectorAll`.
For best performance, call `$.queryAll` directly, or `$.query` if you only need the first match.

`$(mauve array) => mauve array`

Return the given argument

`$(Node) => mauve array`

Return a mauve array containing the given node.

`$(anything[] | NodeList) => mauve array`

Return a mauve array containing the elements of the given array that are valid DOM nodes.

`$(html) => mauve array`

Return a mauve array containing the nodes represented in the given HTML string.
For best performance, call `$.fragment` directly.

`$(function)`

Register a function to be called when the document becomes ready.

###$.fragment
`$.fragment(html) => mauve array`

Return a mauve array containing the nodes represented in the given HTML string.

###$.query
`$.query(selector, [context]) => mauve array`

Return a mauve array which contains the first node in the document which matches the selector string.
If a context is given, the selection is limited to descendants of the nodes represented by the context.
Pseudo-selectors (such as `:before`) are not supported because they are not valid as parameters to `document.querySelector`.

###$.queryAll
`$.query(selector, [context]) => mauve array`

Return a mauve array which contains all of the nodes in the document which match the selector string.
If a context is given, the selection is limited to descendants of the nodes represented by the context.
Pseudo-selectors (such as `:before`) are not supported because they are not valid as parameters to `document.querySelectorAll`.

###$.fn.add
`$(...).add(anything) => this`

Add to this mauve array the elements returned by calling `$()` with the given arguments.

###$.fn.addClass
`$(...).addClass(classes) => this`

Add the classes in the given space-delimited string to all of the nodes in this mauve array.

###$.fn.append
`$(...).append(html) => this`

Append the given HTML string to the innerHTML of all of the nodes in this mauve array.

`$(...).append(Node) => this`

Append the given node as the last child of all of the nodes in this mauve array.

`$(...).append(Node[] | NodeList) => this`

Append the given nodes as the last children of all of the nodes in this mauve array.

###$.fn.attr
`$(...).attr(attribute) => value`

Return the value of the given attribute from the first node in this mauve array.

`$(...).attr(attribute, value) => this`

Set the value of the given attribute to the given value for all of the nodes in this mauve array.

###$.fn.before
`$(...).before(html) => this`

Prepend the given HTML string to the outerHTML of all of the nodes in this mauve array.

`$(...).before(Node) => this`

Insert the given node before each of the nodes in this mauve array if the node has a parent.

`$(...).before(Node[] | NodeList) => this`

Insert the given nodes before each of the nodes in this mauve array if the node has a parent.

###$.fn.children
`$(...).children() => mauve array`

Return a mauve array containing all of the immediate children of each of the nodes in this mauve array.

###$.fn.clone
`$(...).clone() => mauve array`

Return a mauve array containing deep clones of each of the nodes in this mauve array.
This method doesn't have an option for copying data and event handlers over to the new elements, as it has in jQuery.

###$.fn.closest
`$(...).closest(selector, [context]) => mauve array`

Return a mauve array containing the first elements that match the given selector in a walk up the DOM heirarchy from each node in this mauve array including the nodes themselves.
If a context is given, the selection is limited to descendants of the nodes represented by the context.

###$.fn.css
`$(...).css(property) => value`

Return the value of the given CSS property from the first node in this mauve array. The value is fetched from the computed style of the element, or from the style property if the computed value is falsy, as it would be if the element were not in the DOM.

`$(...).css(property, value) => value`

Set the value of the given CSS property to the given value for all of the nodes in this mauve array.

###$.fn.eq
`$(...).eq(index) => mauve array`

Return a mauve array containing the element at the given index in this mauve array. The index may be negative and is wrapped using the length of this mauve array as the modulus. If this mauve array is empty return an empty mauve array.

###$.fn.find
`$(...).find(selector) => mauve array`

Return a mauve array containing the nodes which match the given selector and are descendents of any element in this mauve array.

###$.fn.findFirst
`$(...).find(selector) => mauve array`

Return a mauve array containing the first node which matches the given selector and is a descendent of any element in this mauve array.

###$.fn.first
`$(...).first() => mauve array`

Return a mauve array containing the first element in this mauve array, or an empty mauve array if this mauve array is empty.

###$.fn.get
`$(...).get() => Node[]`

Return a plain array of the elements in this mauve array.

`$(...).get(index) => Node`

Return the node at the given index in this mauve array. The index may be negative and is wrapped using the length of this mauve array as the modulus. If this mauve array is empty return undefined.

###$.fn.hasClass
`$(...).hasClass(className) => boolean[]`

Return true if the first element in this mauve array has the given CSS class, false otherwise. Unlike jQuery, passing a comma-delimited string of class names is not supported.

###$.fn.height
`$(...).height([extent=$.dimensions.BOXSIZING]) => number`

Return the computed value for the height of the first element in this mauve array. The given extent defines how to measure the height. This function is quite defferent to both the jQuery and Zepto implementations.

If no value is given or the value is `$.dimensions.BOXSIZING` then the height is calculated using the current box-sizing of the given element. A box-sizing of 'content-box' evaluates to `$.dimensions.CONTENT`, a box-sizing of 'padding-box' evaluates to `$.dimensions.PADDING` and a box-sizing of 'border-box' evaluates to `$.dimensions.BORDER`. Note that there is no 'margin-box' and 'padding-box' is only available in Gecko and is currently under review.

If the value is `$.dimensions.CONTENT` then the returned value is the height of the content box of the given element. 

If the value is `$.dimensions.PADDING` then the returned value is the height of the padding box of the given element.

If the value is `$.dimensions.BORDER` then the returned value is the height of the border box of the given element.

If the value is `$.dimensions.MARGIN` then the returned value is the height of the margin box of the given element.


#Supported Browsers

- Chrome (latest stable)
- Firefox (latest stable)
- Safari (latest stable)
- iOS 4 (probably) +
- Android 2.2 (probably) +

#Currently Unsupported Browsers

- Internet Explorer
- Opera (mostly because of \_\_proto\_\_)