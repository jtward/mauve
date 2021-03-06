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

Return a mauve array which contains all of the elemtnts in the document which match the selector string.
If a context is given, the selection is limited to descendants of the elements represented by the context.
Pseudo-selectors (such as `:before`) are not supported because they are not valid as parameters to `document.querySelectorAll`.
For best performance, call `$.queryAll` directly, or `$.query` if you only need the first match.

`$(mauve array) => mauve array`

Return the given argument

`$(Node) => mauve array`

Return a mauve array containing the given element.

`$(anything[] | NodeList) => mauve array`

Return a mauve array containing the nodes of the given array that are valid DOM elements.

`$(html) => mauve array`

Return a mauve array containing the elements represented in the given HTML string.
For best performance, call `$.fragment` directly.

`$(function)`

Register a function to be called when the document becomes ready.

###$.fragment
`$.fragment(html) => mauve array`

Return a mauve array containing the elements represented in the given HTML string.

###$.query
`$.query(selector, [context]) => mauve array`

Return a mauve array which contains the first element in the document which matches the selector string.
If a context is given, the selection is limited to descendants of the elements represented by the context.
Pseudo-selectors (such as `:before`) are not supported because they are not valid as parameters to `document.querySelector`.

###$.queryAll
`$.query(selector, [context]) => mauve array`

Return a mauve array which contains all of the elements in the document which match the selector string.
If a context is given, the selection is limited to descendants of the elements represented by the context.
Pseudo-selectors (such as `:before`) are not supported because they are not valid as parameters to `document.querySelectorAll`.

###$.fn.add
`$(...).add(anything) => this`

Add to this mauve array the elements returned by calling `$()` with the given arguments.

###$.fn.addClass
`$(...).addClass(classes) => this`

Add the classes in the given space-delimited string to all of the elements in this mauve array.

###$.fn.append
`$(...).append(html) => this`

Append the given HTML string to the innerHTML of all of the elements in this mauve array.

`$(...).append(Node) => this`

Append the given node as the last child of all of the elements in this mauve array.

`$(...).append(Node[] | NodeList) => this`

Append the given nodes as the last children of all of the elements in this mauve array.

###$.fn.attr
Use `prop` instead of this function when reading DOM properties that change over time such as `checked` and `selected`.

`$(...).attr(attribute) => value`

Return the value of the given attribute from the first element in this mauve array.

`$(...).attr(attribute, value) => this`

Set the value of the given attribute to the given value for all of the elements in this mauve array.

###$.fn.before
`$(...).before(html) => this`

Prepend the given HTML string to the outerHTML of all of the elements in this mauve array.

`$(...).before(Node) => this`

Insert the given node before each of the elements in this mauve array if the node has a parent.

`$(...).before(Node[] | NodeList) => this`

Insert the given nodes before each of the nodes in this mauve array if the node has a parent.

###$.fn.children
`$(...).children() => mauve array`

Return a mauve array containing all of the immediate children of each of the elements in this mauve array.

###$.fn.clone
`$(...).clone() => mauve array`

Return a mauve array containing deep clones of each of the elements in this mauve array.
This method doesn't have an option for copying data and event handlers over to the new elements, as it has in jQuery.

###$.fn.closest
`$(...).closest(selector, [context]) => mauve array`

Return a mauve array containing the first elements that match the given selector in a walk up the DOM heirarchy from each element in this mauve array including the elements themselves.
If a context is given, the selection is limited to descendants of the elements represented by the context.

###$.fn.css
`$(...).css(property) => value`

Return the value of the given CSS property from the first element in this mauve array. 
The value is fetched from the computed style of the element, or from the style property if the computed value is falsy, as it would be if the element were not in the DOM.

`$(...).css(property, value) => value`

Set the value of the given CSS property to the given value for all of the elements in this mauve array.

###$.fn.eq
`$(...).eq(index) => mauve array`

Return a mauve array containing the element at the given index in this mauve array. The index may be negative and is wrapped using the length of this mauve array as the modulus. If this mauve array is empty an empty mauve array os returned.

###$.fn.find
`$(...).find(selector) => mauve array`

Return a mauve array containing the elements which match the given selector and are descendents of any element in this mauve array.

###$.fn.findFirst
`$(...).find(selector) => mauve array`

Return a mauve array containing the first element which matches the given selector and is a descendent of any element in this mauve array.

###$.fn.first
`$(...).first() => mauve array`

Return a mauve array containing the first element in this mauve array, or an empty mauve array if this mauve array is empty.

###$.fn.get
`$(...).get() => Node[]`

Return a plain array of the elements in this mauve array.

`$(...).get(index) => Element`

Return the element at the given index in this mauve array. The index may be negative and is wrapped using the length of this mauve array as the modulus. If this mauve array is empty return undefined.

###$.fn.hasClass
`$(...).hasClass(className) => boolean[]`

Return true if the first element in this mauve array has the given CSS class, false otherwise. Unlike jQuery, passing a comma-delimited string of class names is not supported.

###$.fn.height
`$(...).height([extent=$.dimensions.BOXSIZING]) => number`

Return the computed value for the height of the first element in this mauve array. The given extent defines how to measure the height. This function differs from both the jQuery and Zepto implementations.

If no value is given or the value is `$.dimensions.BOXSIZING` then the height is calculated using the current box-sizing of the given element. A box-sizing of 'content-box' evaluates to `$.dimensions.CONTENT`, a box-sizing of 'padding-box' evaluates to `$.dimensions.PADDING` and a box-sizing of 'border-box' evaluates to `$.dimensions.BORDER`. Note that there is no 'margin-box' and 'padding-box' is only available in Gecko and is currently under review.

If the value is `$.dimensions.CONTENT` then the returned value is the height of the content box of the given element.

If the value is `$.dimensions.PADDING` then the returned value is the height of the padding box of the given element.

If the value is `$.dimensions.BORDER` then the returned value is the height of the border box of the given element.

If the value is `$.dimensions.MARGIN` then the returned value is the height of the margin box of the given element.

###$.fn.hide
`$(...).hide() => this`

Sets the value of the `display` CSS property to `'none'` for each element in this mauve array.

###$.fn.is
`$(...).is(selector) => this`

Return true if the first element in this mauve array matches the given selector, false otherwise.

###$.fn.next
`$(...).next() => mauve array`

Return an mauve array of the the next siblings of the elements in this mauve array. If an element does not have a next sibling it is not included in the returned array.

###$.fn.parent
`$(...).parent() => mauve array`

Return an mauve array of the the immediate parents of the elements in this mauve array. If an element does not have a direct parent it is not included in the returned array.

###$.fn.parents
`$(...).parents() => mauve array`

Return a mauve array of all of the parents of the elements in this mauve array obtained by walking up the DOM tree.

###$.fn.prepend
`$(...).prepend(html) => this`

Prepend the given HTML string to the innerHTML of all of the elements in this mauve array.

`$(...).prepend(Node) => this`

Prepend the given node as the first child of all of the elements in this mauve array.

`$(...).prepend(Node[] | NodeList) => this`

Prepend the given nodes as the first children of all of the elements in this mauve array.

###$.fn.prev
`$(...).prev() => mauve array`

Return an mauve array of the the previous siblings of the elements in this mauve array. If an element does not have a previous sibling it is not included in the returned array.

###$.fn.prop

`$(...).prop(property) => value`

Return the value of the given property from the first element in this mauve array.
Use this function over `attr` when reading DOM properties that change over time such as `checked` and `selected`.

`$(...).prop(property, value) => this`

Set the value of the given property to the given value for all of the elements in this mauve array.

###$.fn.remove
`$(...).remove() => this`

Remove all of the elements in this mauve array from their parent elements, if any.

###$.fn.removeClass
`$(...).removeClass(className) => this`

Remove the classes in the given space-delimited string from all of the elements in this mauve array.

###$.fn.show
`$(...).show() => this`

Sets the display value in the inline style of each of the elements in this mauve array to the empty string so that the display property reverts back to the CSS specified value.
This means that unlike jQuery and Zepto, if an element's specified CSS value for `display` is `'none'`, then the element will not become visible.

###$.fn.siblings
`$(...).siblings([selector]) => mauve array`

Return a mauve array containing all of the siblings of each of the elements in this mauve array. If a selector is given, only the siblings that match the selector will be returned.

###$.fn.text
`$(...).text() => string`

Return the text content of the first element in this mauve array.

`$(...).text(textContent) => this`

Sets the text content of each of the elements in this mauve array to the given text content string.

###$.fn.val
`$(...).val() => string`

Return the value of the first element in this mauve array.

`$(...).val(value) => this`

Sets the value of each of the elements in this mauve array to the given value.

###$.fn.width
`$(...).width([extent=$.dimensions.BOXSIZING]) => number`

Return the computed value for the width of the first element in this mauve array. The given extent defines how to measure the width. This function differs from both the jQuery and Zepto implementations.

If no value is given or the value is `$.dimensions.BOXSIZING` then the width is calculated using the current box-sizing of the given element. A box-sizing of 'content-box' evaluates to `$.dimensions.CONTENT`, a box-sizing of 'padding-box' evaluates to `$.dimensions.PADDING` and a box-sizing of 'border-box' evaluates to `$.dimensions.BORDER`. Note that there is no 'margin-box' and 'padding-box' is only available in Gecko and is currently under review.

If the value is `$.dimensions.CONTENT` then the returned value is the width of the content box of the given element.

If the value is `$.dimensions.PADDING` then the returned value is the width of the padding box of the given element.

If the value is `$.dimensions.BORDER` then the returned value is the width of the border box of the given element.

If the value is `$.dimensions.MARGIN` then the returned value is the width of the margin box of the given element.

#Supported Browsers

- Chrome (latest stable)
- Firefox (latest stable)
- Safari (latest stable)
- iOS 4 (probably) +
- Android 2.2 (probably) +

#Currently Unsupported Browsers

- Internet Explorer
- Opera (mostly because of \_\_proto\_\_)