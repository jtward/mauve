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

###$.closest
`$(...).closest(selector, [context]) => mauve array`
Return a mauve array containing the first elements that match the given selector in a walk up the DOM heirarchy from each node in this mauve array including the nodes themselves.
If a context is given, the selection is limited to descendants of the nodes represented by the context.

###$.css
`$(...).css(property) => value`
Return the value of the given CSS property from the first node in this mauve array. The value is fetched from the computed style of the element, or from the style property if the computed value is falsy, as it would be if the element were not in the DOM.

`$(...).css(property, value) => value`
Set the value of the given CSS property to the given value for all of the nodes in this mauve array.

#Supported Browsers

- Chrome (latest stable)
- Firefox (latest stable)
- Safari (latest stable)
- iOS 4 (probably) +
- Android 2.2 (probably) +

#Currently Unsupported Browsers

- Internet Explorer
- Opera (mostly because of \_\_proto\_\_)