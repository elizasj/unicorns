+++
date = "2016-11-02T00:00:00Z"
tags = "p5js"
title = "Generating Colors"
url = "/2016/11/02/codevemberdaytwo/"
draft = false
type = "post"
+++

For day two of [Codevember](http://codevember.xyz/) I wanted to see if I could do something interesting with color. Anyone who knows the basics of generative art & design knows that real-time color and gradient generation are not the easiest of things to sculpt, but I figure hey, it's #codevember! Why not? Today again, I kept it simple and wrote my 2nd instalment of code using the [p5.js](http://p5js.org/) library.

Take a look below, but honestly, for the full effect it's definitely worth it to click into [codepen](http://codepen.io/elizasj/full/aBoEpm/) and check it out on a bigger canvas. And of course, if you have an suggestions or ideas to improve it somehow, [tweet](https://twitter.com/iamelizasj) me.
&nbsp;
&nbsp;


<p data-height="565" data-theme-id="light" data-slug-hash="aBoEpm" data-default-tab="js" data-user="elizasj" data-embed-version="2" data-pen-title="#codevember 02.11.2016" class="codepen">See the Pen <a href="http://codepen.io/elizasj/pen/aBoEpm/">#codevember 02.11.2016</a> by Eliza SJ (<a href="http://codepen.io/elizasj">@elizasj</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
&nbsp;

I have to say, I'm pretty happy with how this little sketch turned out. Thanks to the alpha channel, the colors have an aquarel/pastel feel to them. And the light stroke around each ellipse caters to my love of geometric perspective.

But really, it all boiled down to two key elements: using [map](https://p5js.org/reference/#/p5/map) to regulate range and [sin()](https://p5js.org/reference/#/p5/sin) to control movement - of both the ellipse in the canvas, and the Hue and Alpha variables in the color and Alpha level spectrums. All in all it makes for a pretty fluid (albeit psychedelic...) little interactive sketch. Click around the canvas to reset the background and see the ellipse path trace itself from different points.
&nbsp;
&nbsp;

---
