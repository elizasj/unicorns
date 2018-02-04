+++
date = "2018-03-01T00:00:00Z"
tags = ["quicktips"]
title = "i++ / ++i"
draft = false
type = "quicktips"
+++

Because of the for loop we’re all pretty used to seeing the shorthand `i++`

```javascript
const numArray = [1, 2, 3, 4, 5];
for (let i = 0; i < numArray.length; i++) {
  console.log(numArray[i]);
}

// 1, 2, 3, 4, 5
```

which means add one to i, or increment i by one.

But what about `++i`?

Turns out `++i` ranks above `i++` in the order of operation food chain, which means that `++i` executes before assignments, whereas `i++` executes once the assignments have been registered during your programs execution.

so

* <strong>i++</strong> returns <strong>i</strong> and then increments it.
* <strong>++i</strong> increments <strong>i</strong> and then returns it.

```javascript
var i = 1;
var returnThenIncrement = i++;
// returnThenIncrement = 1, i = 2

var incrementThenReturn = ++i;
// incrementThenReturn = 3, i = 3
```
