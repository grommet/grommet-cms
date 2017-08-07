
[Source](https://css-tricks.com/snippets/css/a-guide-to-flexbox/ "Permalink to A Complete Guide to Flexbox")

# A Complete Guide to Flexbox

### [Background][1]

The `Flexbox Layout` (Flexible Box) module (currently a W3C Last Call Working Draft) aims at providing a more efficient way to lay out, align and distribute space among items in a container, even when their size is unknown and/or dynamic (thus the word "flex").

The main idea behind the flex layout is to give the container the ability to alter its items' width/height (and order) to best fill the available space (mostly to accommodate to all kind of display devices and screen sizes). A flex container expands items to fill available free space, or shrinks them to prevent overflow.

Most importantly, the flexbox layout is direction-agnostic as opposed to the regular layouts (block which is vertically-based and inline which is horizontally-based). While those work well for pages, they lack flexibility (no pun intended) to support large or complex applications (especially when it comes to orientation changing, resizing, stretching, shrinking, etc.). 

**Note:** Flexbox layout is most appropriate to the components of an application, and small-scale layouts, while the [Grid][2] layout is intended for larger scale layouts. 

### [Basics &amp; Terminology][3]

Since flexbox is a whole module and not a single property, it involves a lot of things including its whole set of properties. Some of them are meant to be set on the container (parent element, known as "flex container") whereas the others are meant to be set on the children (said "flex items").

If regular layout is based on both block and inline flow directions, the flex layout is based on "flex-flow directions". Please have a look at this figure from the specification, explaining the main idea behind the flex layout.

![][4]

Basically, items will be laid out following either the `main axis` (from `main-start` to `main-end`) or the cross axis (from `cross-start` to `cross-end`).

* **main axis** \- The main axis of a flex container is the primary axis along which flex items are laid out. Beware, it is not necessarily horizontal; it depends on the `flex-direction` property (see below).
* **main-start | main-end** \- The flex items are placed within the container starting from main-start and going to main-end.
* **main size** \- A flex item's width or height, whichever is in the main dimension, is the item's main size. The flex item's main size property is either the 'width' or 'height' property, whichever is in the main dimension.
* **cross axis** \- The axis perpendicular to the main axis is called the cross axis. Its direction depends on the main axis direction.
* **cross-start | cross-end** \- Flex lines are filled with items and placed into the container starting on the cross-start side of the flex container and going toward the cross-end side.
* **cross size** \- The width or height of a flex item, whichever is in the cross dimension, is the item's cross size. The cross size property is whichever of 'width' or 'height' that is in the cross dimension.

![][5]

## Properties for the Parent  
(flex container)

#### display

This defines a flex container; inline or block depending on the given value. It enables a flex context for all its direct children.
    
    
    .container {
      display: flex; /* or inline-flex */
    }

Note that CSS columns have no effect on a flex container. 

#### flex-direction

![][6]  
This establishes the main-axis, thus defining the direction flex items are placed in the flex container. Flexbox is (aside from optional wrapping) a single-direction layout concept. Think of flex items as primarily laying out either in horizontal rows or vertical columns.
    
    
    .container {
      flex-direction: row | row-reverse | column | column-reverse;
    }

* `row` (default): left to right in `ltr`; right to left in `rtl`
* `row-reverse`: right to left in `ltr`; left to right in `rtl`
* `column`: same as `row` but top to bottom
* `column-reverse`: same as `row-reverse` but bottom to top

#### flex-wrap

![][7]  
By default, flex items will all try to fit onto one line. You can change that and allow the items to wrap as needed with this property. Direction also plays a role here, determining the direction new lines are stacked in.
    
    
    .container{
      flex-wrap: nowrap | wrap | wrap-reverse;
    }

* `nowrap` (default): single-line / left to right in `ltr`; right to left in `rtl`
* `wrap`: multi-line / left to right in `ltr`; right to left in `rtl`
* `wrap-reverse`: multi-line / right to left in `ltr`; left to right in `rtl`

#### flex-flow (Applies to: parent flex container element)

This is a shorthand `flex-direction` and `flex-wrap` properties, which together define the flex container's main and cross axes. Default is `row nowrap`.
    
    
    flex-flow: &lt;'flex-direction'&gt; || &lt;'flex-wrap'&gt;

#### justify-content

![][8]  
This defines the alignment along the main axis. It helps distribute extra free space left over when either all the flex items on a line are inflexible, or are flexible but have reached their maximum size. It also exerts some control over the alignment of items when they overflow the line.
    
    
    .container {
      justify-content: flex-start | flex-end | center | space-between | space-around;
    }

* `flex-start` (default): items are packed toward the start line
* `flex-end`: items are packed toward to end line
* `center`: items are centered along the line
* `space-between`: items are evenly distributed in the line; first item is on the start line, last item on the end line
* `space-around`: items are evenly distributed in the line with equal space around them. Note that visually the spaces aren't equal, since all the items have equal space on both sides. The first item will have one unit of space against the container edge, but two units of space between the next item because that next item has its own spacing that applies.

#### align-items

![][9]  
This defines the default behaviour for how flex items are laid out along the cross axis on the current line. Think of it as the `justify-content` version for the cross-axis (perpendicular to the main-axis).
    
    
    .container {
      align-items: flex-start | flex-end | center | baseline | stretch;
    }

* `flex-start`: cross-start margin edge of the items is placed on the cross-start line
* `flex-end`: cross-end margin edge of the items is placed on the cross-end line
* `center`: items are centered in the cross-axis
* `baseline`: items are aligned such as their baselines align
* `stretch` (default): stretch to fill the container (still respect min-width/max-width)

#### align-content

![][10]  
This aligns a flex container's lines within when there is extra space in the cross-axis, similar to how `justify-content` aligns individual items within the main-axis. 

**Note:** this property has no effect when there is only one line of flex items.
    
    
    .container {
      align-content: flex-start | flex-end | center | space-between | space-around | stretch;
    }

* `flex-start`: lines packed to the start of the container
* `flex-end`: lines packed to the end of the container
* `center`: lines packed to the center of the container
* `space-between`: lines evenly distributed; the first line is at the start of the container while the last one is at the end
* `space-around`: lines evenly distributed with equal space around each line
* `stretch` (default): lines stretch to take up the remaining space

![][11]

## Properties for the Children  
(flex items)

#### order

![][12]  
By default, flex items are laid out in the source order. However, the `order` property controls the order in which they appear in the flex container.
    
    
    .item {
      order: <integer>;
    }

#### flex-grow

![][13]  
This defines the ability for a flex item to grow if necessary. It accepts a unitless value that serves as a proportion. It dictates what amount of the available space inside the flex container the item should take up. 

If all items have `flex-grow` set to 1, the remaining space in the container will be distributed equally to all children. If one of the children has a value of 2, the remaining space would take up twice as much space as the others (or it will try to, at least).
    
    
    .item {
      flex-grow: <number>; /* default 0 */
    }

Negative numbers are invalid. 

#### flex-shrink

This defines the ability for a flex item to shrink if necessary.
    
    
    .item {
      flex-shrink: <number>; /* default 1 */
    }

Negative numbers are invalid. 

#### flex-basis

This defines the default size of an element before the remaining space is distributed. It can be a length (e.g. 20%, 5rem, etc.) or a keyword. The `auto` keyword means "look at my width or height property" (which was temporarily done by the `main-size` keyword until deprecated). The `content` keyword means "size it based on the item's content" - this keyword isn't well supported yet, so it's hard to test and harder to know what its brethren `max-content`, `min-content`, and `fit-content` do.
    
    
    .item {
      flex-basis: <length> | auto; /* default auto */
    }

If set to `0`, the extra space around content isn't factored in. If set to `auto`, the extra space is distributed based on its `flex-grow` value. [See this graphic.][14]

#### flex

This is the shorthand for `flex-grow,` `flex-shrink` and `flex-basis` combined. The second and third parameters (`flex-shrink` and `flex-basis`) are optional. Default is `0 1 auto`.
    
    
    .item {
      flex: none | [ &lt;'flex-grow'&gt; &lt;'flex-shrink'&gt;? || &lt;'flex-basis'&gt; ]
    }

**It is recommended that you use this shorthand property** rather than set the individual properties. The short hand sets the other values intelligently. 

#### align-self

![][15]  
This allows the default alignment (or the one specified by `align-items`) to be overridden for individual flex items.

Please see the `align-items` explanation to understand the available values.
    
    
    .item {
      align-self: auto | flex-start | flex-end | center | baseline | stretch;
    }

Note that `float`, `clear` and `vertical-align` have no effect on a flex item. 

### Examples

Let's start with a very very simple example, solving an almost daily problem: perfect centering. It couldn't be any simpler if you use flexbox.
    
    
    .parent {
      display: flex;
      height: 300px; /* Or whatever */
    }
    
    .child {
      width: 100px;  /* Or whatever */
      height: 100px; /* Or whatever */
      margin: auto;  /* Magic! */
    }

This relies on the fact a margin set to `auto` in a flex container absorb extra space. So setting a vertical margin of `auto` will make the item perfectly centered in both axis.

Now let's use some more properties. Consider a list of 6 items, all with a fixed dimensions in a matter of aesthetics but they could be auto-sized. We want them to be evenly and nicely distributed on the horizontal axis so that when we resize the browser, everything is fine (without media queries!).
    
    
    .flex-container {
      /* We first create a flex layout context */
      display: flex;
      
      /* Then we define the flow direction and if we allow the items to wrap 
       * Remember this is the same as:
       * flex-direction: row;
       * flex-wrap: wrap;
       */
      flex-flow: row wrap;
      
      /* Then we define how is distributed the remaining space */
      justify-content: space-around;
    }

Done. Everything else is just some styling concern. Below is a pen featuring this example. Be sure to go to CodePen and try resizing your windows to see what happens.

See the Pen [Demo Flexbox 1][16] by CSS-Tricks ([@css-tricks][17]) on [CodePen][18].

Let's try something else. Imagine we have a right-aligned navigation on the very top of our website, but we want it to be centered on medium-sized screens and single-columned on small devices. Easy enough.
    
    
    /* Large */
    .navigation {
      display: flex;
      flex-flow: row wrap;
      /* This aligns items to the end line on main-axis */
      justify-content: flex-end;
    }
    
    /* Medium screens */
    @media all and (max-width: 800px) {
      .navigation {
        /* When on medium sized screens, we center it by evenly distributing empty space around items */
        justify-content: space-around;
      }
    }
    
    /* Small screens */
    @media all and (max-width: 500px) {
      .navigation {
        /* On small screens, we are no longer using row direction but column */
        flex-direction: column;
      }
    }

See the Pen [Demo Flexbox 2][19] by CSS-Tricks ([@css-tricks][17]) on [CodePen][18].

Let's try something even better by playing with flex items flexibility! What about a mobile-first 3-columns layout with full-width header and footer. And independent from source order.
    
    
    .wrapper {
      display: flex;
      flex-flow: row wrap;
    }
    
    /* We tell all items to be 100% width */
    .header, .main, .nav, .aside, .footer {
      flex: 1 100%;
    }
    
    /* We rely on source order for mobile-first approach
     * in this case:
     * 1. header
     * 2. nav
     * 3. main
     * 4. aside
     * 5. footer
     */
    
    /* Medium screens */
    @media all and (min-width: 600px) {
      /* We tell both sidebars to share a row */
      .aside { flex: 1 auto; }
    }
    
    /* Large screens */
    @media all and (min-width: 800px) {
      /* We invert order of first sidebar and main
       * And tell the main element to take twice as much width as the other two sidebars 
       */
      .main { flex: 2 0px; }
      
      .aside-1 { order: 1; }
      .main    { order: 2; }
      .aside-2 { order: 3; }
      .footer  { order: 4; }
    }

See the Pen [Demo Flexbox 3][20] by CSS-Tricks ([@css-tricks][17]) on [CodePen][18].

### [Prefixing Flexbox][21]

Flexbox requires some vendor prefixing to support the most browsers possible. It doesn't just include prepending properties with the vendor prefix, but there are actually entirely different property and value names. This is because the Flexbox spec has changed over time, creating an ["old", "tweener", and "new"][22] versions.

Perhaps the best way to handle this is to write in the new (and final) syntax and run your CSS through [Autoprefixer][23], which handles the fallbacks very well.

Alternatively, here's a Sass @mixin to help with some of the prefixing, which also gives you an idea of what kind of things need to be done:
    
    
    @mixin flexbox() {
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
    }
    
    @mixin flex($values) {
      -webkit-box-flex: $values;
      -moz-box-flex:  $values;
      -webkit-flex:  $values;
      -ms-flex:  $values;
      flex:  $values;
    }
    
    @mixin order($val) {
      -webkit-box-ordinal-group: $val;  
      -moz-box-ordinal-group: $val;     
      -ms-flex-order: $val;     
      -webkit-order: $val;  
      order: $val;
    }
    
    .wrapper {
      @include flexbox();
    }
    
    .item {
      @include flex(1 200px);
      @include order(2);
    }

### [Related Properties][24]

### [Other Resources][25]

### [Bugs][26]

Flexbox is certainly not without its bugs. The best collection of them I've seen is Philip Walton and Greg Whitworth's [Flexbugs][27]. It's an open source place to track all of them, so I think it's best to just link to that.

### Browser Support

Broken up by "version" of flexbox:

* (new) means the recent syntax from the specification (e.g. `display: flex;`)
* (tweener) means an odd unofficial syntax from 2011 (e.g. `display: flexbox;`)
* (old) means the old syntax from 2009 (e.g. `display: box;`)

| Chrome        | Safari         | Firefox          | Opera | IE | Android | iOS |  
| ------------- | -------------- | ---------------- | ----- | -- | ------- | --- |  
| 20- (old)    
21+ (new)       | 3.1+ (old)    
6.1+ (new)      | 2-21 (old)    
22+ (new)       | 12.1+ (new)    | 10 (tweener)    
11+ (new)       | 2.1+ (old)    
4.4+ (new)      | 3.2+ (old)    
7.1+ (new)      |  

Blackberry browser 10+ supports the new syntax.

For more informations about how to mix syntaxes in order to get the best browser support, please refer to [this article (CSS-Tricks)][28] or [this article (DevOpera)][29].

[1]: https://css-tricks.com#flexbox-background
[2]: http://css-tricks.com/snippets/css/complete-guide-grid/
[3]: https://css-tricks.com#flexbox-basics
[4]: https://cdn.css-tricks.com/wp-content/uploads/2011/08/flexbox.png
[5]: https://css-tricks.com/wp-content/uploads/2014/05/flex-container.svg
[6]: https://css-tricks.com/wp-content/uploads/2013/04/flex-direction2.svg
[7]: https://css-tricks.com/wp-content/uploads/2014/05/flex-wrap.svg
[8]: https://css-tricks.com/wp-content/uploads/2013/04/justify-content.svg
[9]: https://css-tricks.com/wp-content/uploads/2014/05/align-items.svg
[10]: https://css-tricks.com/wp-content/uploads/2013/04/align-content.svg
[11]: https://css-tricks.com/wp-content/uploads/2014/05/flex-items.svg
[12]: https://css-tricks.com/wp-content/uploads/2013/04/order-2.svg
[13]: https://css-tricks.com/wp-content/uploads/2014/05/flex-grow.svg
[14]: http://www.w3.org/TR/css3-flexbox/images/rel-vs-abs-flex.svg
[15]: https://css-tricks.com/wp-content/uploads/2014/05/align-self.svg
[16]: http://codepen.io/team/css-tricks/pen/EKEYob/
[17]: http://codepen.io/css-tricks
[18]: http://codepen.io
[19]: http://codepen.io/team/css-tricks/pen/YqaKYR/
[20]: http://codepen.io/team/css-tricks/pen/jqzNZq/
[21]: https://css-tricks.com#flexbox-sass
[22]: http://css-tricks.com/old-flexbox-and-new-flexbox/
[23]: http://css-tricks.com/autoprefixer/
[24]: https://css-tricks.com#flexbox-related
[25]: https://css-tricks.com#flexbox-resources
[26]: https://css-tricks.com#flexbox-bugs
[27]: https://github.com/philipwalton/flexbugs
[28]: https://css-tricks.com/using-flexbox/
[29]: http://dev.opera.com/articles/view/advanced-cross-browser-flexbox/#fallbacks

  </length></number></number></integer>