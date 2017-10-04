+++
date = "2017-01-19T00:00:00Z"
tags = ["javascript", "algorithms"]
title = "Caeser Cipher"
url = "/2017/01/19/2017CaesarsCipher/"
draft = false
type = "post"
+++

Ceaser Cypher aka the shift cypher is one of those super annoying challenges that has haunted me from the beginning of my programming journey. Annoying because the concept is so simple to visualize - just rotate the letters of the alphabet to the right by a certain number of places in order to decode the secret message -  but requires the implementation of a few choice manoeuvres that can be tricky to get a handle on.

## First an example:
Let's take the word 'CAT' (=^･^=)ﾉ If we keep with convention and solve for  the ROT13 cypher, that means shifting each letter over to the right by 13 spots. Encoded, 'CAT' becomes 'PNG'.  Keep in mind too, that when we get to the letter M (or Z,) we hit the end of the original alphabet, and so we have to shift back over to the first letter, A, and continue from there. If that made no sense to you, check out this diagram:

{: .container-to-center}
![Image](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Caesar_cipher_left_shift_of_3.svg/856px-Caesar_cipher_left_shift_of_3.svg.png){:height="200px"}

If you take the time to work this out on paper, you might be thinking I've spelt the encoded version of 'CAT' wrong. Wouldn't it work out to a much less ironic-internets 'OMF' ? (🐱📸 #moarcatpics)

Well actually no, not if we use [zero-based numbering](https://en.wikipedia.org/wiki/Zero-based_numbering), which computers do. PNG it is!


## Things to keep in mind:

{: .inherit-size}
- ASCII codes: a numerical representation of letters, digits, punctuation marks, etc. on your keyboard.

- Lowercase vs Uppercase: in ASCII code, you have both a lowercase alphabet and an uppercase alphabet. Each are comprised of their own different code numbers.

- [String.charCodeAt()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt): a method that returns the ASCII code for a given character

- [String.fromCharCode()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt): a method that receives an ASCII code and returns the corresponding letter.

- [map()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/map): a method that receives an array, and returns a new one that is comprised of the outcome of a function having been called on each element in that original array.

- [split()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split): a method that receives a string and returns an array of sub-strings, divided by a given separator.

## The Steps:

{: .inherit-size}
- __1.__ ensure all letters are uppercase

- __2.__ split the code-word into substrings

- __3.__ find the ASCII code number for each of the substrings

- __4.__ figure out the range (keeping in mind you're counting from base-0). In our case since we are converting all letters to uppercase, our range is 65-90. However, if you were converting to lowercase, your range would work out to 97-122.

{{< highlight JS >}}
if(letter >= 65 && letter <= 77) {
	letter +=13
} else if { (letter >= 78 && letter <= 90) {
	letter -=13;
}
{{< / highlight >}}

{: .inherit-size}
- __5.__ convert each of the ranged numbers back into their ASCII code letter equivalent

- __6.__ join each individual letter back into a complete string, to form the code word.

The final resulting code:

{{< highlight JS >}}
function cipher(str){  

  var characters = str.toUpperCase().split("");

  return characters.map(function(letter){
    letter = letter.charCodeAt();

    if (letter >= 65 && letter <= 77){
      letter += 13;
    } else if (letter >= 78 && letter <= 90){
      letter -= 13;
    }

    return String.fromCharCode(letter);
  }).join("");
}

cipher("PNG");
{{< / highlight >}}

There are of course so many ways to go about this challenge, and much more elegant approaches I'm sure. But this is the most straightforward, readable take on the solution that I've come up with so far.  

### A thought on visualization:

When I was first working this out, I got a bit stuck on __step 4__ because I was so focused on the idea of the letters physically shifting over in one direction - I had that image so clear in my mind  that I just couldn't accept a solution using both addition and subtraction in the above `if statement`. It felt so wrong to be moving what felt like both 'backwards' and 'forwards' in the cipher. In fact the above statement correctly adjusts the cipher for any of the letters that 'bleed over', aka shift beyond the 25th position (but 26th letter, because #base0) either adding or subtracting 13 positions as need be. This might seem like such a small thing to get stuck on, but it goes to show that we can sometimes very much get in our own way when trying to consolidate the ideas we have with the code we write.
