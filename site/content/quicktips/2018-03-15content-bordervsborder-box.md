+++
date = "2018-03-15T00:00:00Z"
tags = ["quicktips"]
title = "Border vs Border Box"
draft = false
type = "quicktips"
+++

Why is `box-sizing` important? Because it's what defines how the width & height of the elements you see in your browser will be calculated. It can be pretty handy then, to set it in the all-encompassing `html` element in your styles.

## The Box

Litterally every element you'll deal with when designing and laying things out visually in your browser is... a box! If you're drawing a blank, open up devtools, go to the inspect tab, and hover over any html tag. You'll see the tag's element's box highlighted in your browser.

In order to be able to manipulate the content found within all these boxes, it's important to know how things like padding, border, and margin are calculate in reference to them.

You can choose how you want them to relate to one another by setting `box-sizing`.

## Border-Box

Border-Box basically means that the width of the content, plus the width of the padding, plus the width of the border all together, become '_width: whatever-number-you-happen-to-set_'.

```css
html {
  box-sizing: border-box;
}
```

So setting `box-sizing`to `border-box` means that you now have width and margin available to you, so the width of the box, including padding and border, plus the margins tacked on to the _outside_ edge of the box.

<img src="/images/border-box.png">

But border-box isn't an inherited property, meaning it doesn't inherit properties from it's parent element by default. So make sure you set box-sizing to inherit `:before`& `:after` to avoid any spacing surprises down the line.

```css
*,
*:before,
*:after {
  box-sizing: inherit;
}
```

## Content-Box

If you don't set `box-sizing`, the default `content-box` model will be applied, meaning that padding, border and margin are added to the box, but width and height are added to the content. So when your figuring out spacing you'll have to do some math - and even if you're a whiz with calculations, opting to use this default will almost certainly still serve you up some surprising results when it comes to box size. (Think randomly extra-large box-size...)

These days it's pretty common practice to set `border-box` to avoid said surprises.

<img src="/images/content-box.png">
