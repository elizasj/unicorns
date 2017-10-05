+++
date = "2016-11-03T00:00:00Z"
tags = ["p5js"]
title = "Murky Waters"
url = "/2016/11/03/codevemberdaythree/"
draft = false
type = "posts"
+++

So far I've stuck to some pretty basic animations for my contributions to [Codevember](http://codevember.xyz/), but today I thought I'd try to create slightly more fluid (see what I did there? ⁽(◍˃̵͈̑ᴗ˂̵͈̑)⁽ 🌊) movement in my sketch. The easiest way to achieve that in [p5.js](http://p5js.org/) is of course to use [Perlin noise](https://p5js.org/reference/#/p5/noise).

If you haven't had a chance to get your hands dirty with it yet, I highly recommend checking out [Dan Shiffman](https://twitter.com/shiffman?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor)'s [introduction](https://www.youtube.com/watch?v=Qf4dIN99e2w) to the subject. He's great at explaining exactly how things work in both theory and code.

That being said, for the sake of clarity (and after getting into a debate with a fellow coworker on the subject,) I feel like it's worth mentioning that when Shiffman explains the more sciency concepts, he's not necessarily getting into the exact specifics of those concepts as they pertain to science IRL. Rather he's tackling them from the point of view of the p5.js library. That is to say that the general idea is reflected, but the stricter truths about certain elements might not be fully respected.

But back to the code. I created two types of 'waves' for todays project, using Perlin Noise to influence the Y-axis movement of my line() function. Peak at my code below, but as usual if you want to experience the 'full effect' click into the [codepen](http://codepen.io/elizasj/pen/wowrrM) version.
&nbsp;

<p data-height="565" data-theme-id="light" data-slug-hash="wowrrM" data-default-tab="js" data-user="elizasj" data-embed-version="2" data-pen-title="#codevember 03.11.2016" class="codepen">See the Pen <a href="http://codepen.io/elizasj/pen/wowrrM/">#codevember 03.11.2016</a> by Eliza SJ (<a href="http://codepen.io/elizasj">@elizasj</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
&nbsp;


A quick note on Codevember - I've been seeing so many [amazing contributions](https://twitter.com/search?q=%23codevember&src=typd) these first few days. It's almost too intimidating to throw my own work into the batch since my approach is less about showing the very, very, best, most complex sketches I can do, and more about experimenting with simple concepts and ideas about things like movement, colour, and interaction. For me, it's also an exercise in keeping things short, sweet and simple in terms of time invested vs output. Where I can normally spend hours on hours on hours exploring and tinkering with this stuff without necessarily having a specific goal, (and often nothing particularly inspired to show for all that tinkering,) this month I'm flipping my usual habit on its head (*•̀ᴗ•́*)و ̑̑




---
