+++
date = "2016-11-05T00:00:00Z"
tags = "webgl, p5js, javascript"
title = "Shine Bright"
url = "/2016/11/05/codevemberdayfive/"
draft = false
type = "post"
+++

Well, yesterday was a definitely a [Codevember](http://codevember.xyz/) fail on my part. Turns out Friday night just not the most ideal night to stay in and code, 🍻! But since I missed a day, I figured I'd take a stab at something I haven't really tried before: [WebGL](https://github.com/processing/p5.js/wiki/Getting-started-with-WebGL-in-p5). I've heard so many varying opinions about this API over the years, that I've never quite found the courage to try to use it. But today I finally got my chance: my flight to Paris was delayed by two hours (thanks easyjet 😒🙄) and I had no access to the internet. It was just me and my [p5.js](http://p5js.org/) editor, which if you didn't know, comes with a bunch of example programs that you can play around with.

I picked the _Sine Cosine in 3D_ example, and tried to dissect it, which actually wasn't so hard to do. To be honest, of all the things that I expected to trip me up - like getting some control over the way my shapes moved, or how they were positioned in, space for example - it was the lighting in the end that took the most thinking to figure out. There's just something about the reversed grid in computer graphics that throws me off... but unfortunately (or fortunately,) without any lights, your shapes end up looking pretty flat, so you don't have much of a choice _but_ to figure it out.

<p data-height="665" data-theme-id="light" data-slug-hash="Wobwyv" data-default-tab="js" data-user="elizasj" data-embed-version="2" data-pen-title="#codevember 05.11.2016" class="codepen">See the Pen <a href="http://codepen.io/elizasj/pen/Wobwyv/">#codevember 05.11.2016</a> by Eliza SJ (<a href="http://codepen.io/elizasj">@elizasj</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

After looking at a few other examples, I started to understand how to position the lights and manage their intensity. I went for a really high shine effect, to give the shapes a delicate, diamond-like appearance, which to me works quite well with the story the movement is telling.

Speaking of which, I always aim to create a 'natural' feeling in anything I animate. If I can, I try to void the (all-to-common, imo) fail-safe sine/cosine spirals that look like they were ported from a scientific calculator (here's looking at you Texas Instruments!) So I tinkered away at the size, rotation and spin until I got a looped movement that felt like it kind of had a little narrative all to itself.

Thoughts/comments? [Tweet](https://twitter.com/iamelizasj) me!

---
