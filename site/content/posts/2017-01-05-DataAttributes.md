+++
date = "2017-01-05T00:00:00Z"
tags = ["html5", "javascript"]
title = "Quick & Easy - Data Attributes"
url = "/2017/01/05/DataAttributes/"
draft = false
type = "posts"
+++

There's a certain intimidating freedom that exists in the code world which takes a minute to get used to. I obviously can't speak for everyone, but it has definitely thrown me off more than once, and really simple things. Take data attributes for example. Used in markup, they seem pretty straightforward, right? And * shocker * they really, _really_ are.

Used as mini storage compartments within html elements,  data attributes provide a simple way to attach any non-visual information to them,  which can come in quite handy if you want to say, connect a particular HTML element to a javascript event, as shown in the example below. But that hazy, somewhat grey code-zone in which certain things need to be written in a super specific way while others can be written at the coders discretion left me thinking that data attribute names were devised explicitly, by the programer-powers-that-be. Turns out you can just add any word you like the to 'data-' prefix and get on with it!

I've got to tip my hat to [Wes Bos](http://wesbos.com/)*, who really is quite the JS boss (teehee) & who's drum kit mini-tut cleared up my unbeknownst data attribute confusion:

```html
<html>
    ...
    <div class="keys">
          <div data-key="65" class="key">
            ...
          </div>
    	...
    </div>
    ...
    <audio data-key="65" src="sounds/clap.wav"></audio>
</html>
```
```javascript
<script>
    function playSound(e) {
        // select audio element w/specific data selector
        const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        // select key class w/specific data selector
        const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    ...
 }
</script>
```

You'll notice in the above example that the tut used ES6 template strings to call the event's keyCode aka the code associated to the key board key being hit, which we figured out thanks to this nifty little [tool](http://keycode.info/), and then used that number (key code) as the data-key id in both the ```<div>``` as well as the ```<audio>``` tags.  

N.B: A note on using keyCode IRL -- it's actually no longer really supported and MDN warns [not to rely on it](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode) as it'll soon be deprecated - but for the purpose of this little tut, it served it's purpose.

*if you haven't checked out his [courses](http://wesbos.com/courses/), they are well worth it. He even has a free [30 days course on Vanilla JS](http://wesbos.com/javascript30/) which is sure to give you many delicious ah-ha moments of your own.
