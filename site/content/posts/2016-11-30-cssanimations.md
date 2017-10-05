+++
date = "2016-11-30T00:00:00Z"
tags = ["css", "animation"]
title = "CSS Animations - an Introduction"
url = "/2016/11/30/cssanimations/"
draft = false
type = "posts"
+++

"All you need to get some CSS animation happening is to attach an animation to an element in the CSS. " - [Smashing Mag](https://www.smashingmagazine.com/2011/09/the-guide-to-css-animation-principles-and-examples/)

Sounds simple enough ... right ?

One might expect that after a first successful foray into WebGL (via the P5.js lib, but still...) CSS animations would be a breeze. Turns out, not so much. Which might explain why I dropped the face off [#Codevember](http://codevember.xyz/) earth after 5 successful days of creative sketches. Alas, after a very frustrating attempt at animating a simple bouncing ball, I found myself falling head first down the CSS Animations rabbit hole, and I've been there ever since.

It's not that CSS Animations are complicated per say, but as with all things web, there's a lot of shit advice out there and it can take a minute to sift through the muck (here's hoping my own doesn't fall into that category, I do my best!) I'm also not looking for your run of the mill "let's animate a loading wheel" tutorial. My creative ambitions are more abstract in that sense, so finding answers can sometimes prove to be a greater challenge than applying their solutions.

Digressions aside, here's what I've learned:

__Positioning the element to be animated__

There are two basic ways to do this, each one presupposes a different way of manipulating the animation going forward. While the movements end up being pretty much the same, it turns out that option two is actually [better for performance](http://paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft).


1. Position the element as relative, absolute or fixed, move the element with top, right, left, bottom.


This method is great if all you want to do is move your content around the page in a flat way - there is a great [tutorial](https://css-tricks.com/video-screencasts/97-intro-to-css-animations/) from 2013 that shows how this works. But animating is about more than left, right, up, and down movements. Anyone who's dabbled in graphics can attest: you are essentially transforming 👈 your visuals over time. Which quite appropriately brings us from 2013 straight into 2016: these days most will advise against option one in lieu of option two: using CSS transforms 👈 (see what I did there? 😬) on a block or in-line element...


2. Give the element a display of block or inline-block, move the element using the transform value of
translate(), translateX(), or translateY(), scale(), skewX()/skewY(), rotate or if you want a
combination of all of these, with matrix(). Not only do you have a wider array of movement options,
but as I mentioned, performance wise you come out on top, too.


What's more, the translate property allows us to manipulate the object without changing any of its base properties (such as position, width or height), which makes it ideal for CSS animations: you want to avoid triggering repaints on each and every frame because #performance. In a nutshell it would seem that  in 2016 CSS Animations really boil down to using the transform and opacity elements to manipulate your visuals, et basta. Using any other elements will call for repaints, which will mess with your browser.

All that said, I still struggled with centering my animation middle of the page. I've actually only found one foolproof solution so far:

```css
.element {
	position: fixed;
	top:-100%; right:-100%; left:-100%; bottom:-100%;
	margin:auto;
	z-index:
}
```

Yay🎉 because it works, but if anyone knows of a  more elegant way to do this, [ping me](https://twitter.com/iamelizasj) on twitter. I'd love something a little cleaner, if it exists.

__Animating the element__

The syntax for animations is actually quite straight forward - the basics can be found [here](https://css-tricks.com/snippets/css/keyframe-animation-syntax/). If you happen to have ever dabbled in video SFX you'll recognize the idea of key frames from After Effects. Any relics from the Wild Wild West era of the internet  (circa anytime before 2008-ish) will recognize keyframes from Flash animations as well.

The idea being that you set breakpoints in your animations lifecycle,  for each change you want it to manifest. Below is a really simple example of an animation that would flash into view at the half-way mark, before disappearing from view again.

```css
@keyframes name-of-animation {
  0%, 100%   { opacity: 0; }
  50% { opacity: 1; }
}
```

For each breakpoint you can set individual properties like so:

```css
.thing-to-animate {
 animation-name: bounce;
 animation-duration: 4s;
 animation-iteration-count: 10;
 animation-direction: alternate;
 animation-timing-function: ease-out;
 animation-fill-mode: forwards;
 animation-delay: 2s;
}
```

The order that you use to declare your properties doesn't matter,  except if you are using both duration and delay. Those need to be declared one after the other (duration first, delay second,) followed by the number of desired iterations of the animation... but most of the time you'll see any used properties written in a single line like this:

```css
# code block
.thing-to-animate {
	animation: name-of-animation 1s 2s 3 alternate backwards
}
```

__A few things I found handy__

Ease is the default setting for timing speed, which in most cases adds a bit of realism to your animation - it 'eases' into the movement slowly, hits the speed threshold you set, and then slows down on it's way out again. Kind of like a fade in/fade out in film, but for speed of movement instead of image clarity. In the off-chance that your animation needs continuous movement at a maintained speed, it's good to know that the default is ease, as you'd have to set it to linear instead.

Multiple animations on a given div
This was one of my initial hangups with animations - what if you wanted to do different types of movements, at certain overlapping break points, but not others. What if you wanted to layer types of animation sequences? Simple: just stack them.


```css
.thing-to-animate {
   animation:
      name-of-first-animation 1s 2s 3 alternate backwards,
      name-of-second-animation 4s 2s  infinite;
}
```

Basic Movements Cheat Sheet:
Like I mentioned above, you really should only be using two basic properties : opacity & transform. But if you're having trouble conceiving of how to reproduce certain types of movements or [angles of view](http://desandro.github.io/3dtransforms/examples/transforms-01-functions.html) using only those two options here is a simple breakdown :

```css
Position — transform: translateX(n) translateY(n) translateZ(n);
Scale — transform: scale(n);
Rotation — transform: rotate(ndeg);
```

So finally, after all that searching (and on the very last day of #Codevember, go figure...) I finished my bouncing ball. Here it is in all it's glory:

<p data-height="600" data-theme-id="light" data-slug-hash="woqgmw" data-default-tab="result" data-user="elizasj" data-embed-version="2" data-pen-title="bounce" class="codepen">See the Pen <a href="http://codepen.io/elizasj/pen/woqgmw/">bounce</a> by Eliza SJ (<a href="http://codepen.io/elizasj">@elizasj</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

---
