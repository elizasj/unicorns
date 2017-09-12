+++
date = "2017-01-11T00:00:00Z"
tags = "learning, documentation"
title = "Learning To Read (Again)"
url = "/2017/01/11/2017LearningToRead/"
draft = false
type = "post"
+++

I gotta say, code documentation has a pretty bad rap. To be fair, a ton of it is really (_really_) badly written, and sometimes it's not even maintained. But to play devils advocate, I would also offer that a lot of people don't really know how to read documentation either. I myself have been schooled a few times in the proper way to actually find the information I'm looking for when scanning through what can often prove to be a quite confusing set of guides and examples. And while it would be so easy to point the finger solely and those poor souls who have to sit down and hash out the ins and outs of their SDK or API for the rest of us, I'll instead share some of the advice that was given to me and things to keep in mind when it comes to figuring out those damn docs...


## 1. Documentation ≠ Book
This probably goes without saying, but no matter how eloquently written they may be, read docs as necessary, don't read them from start to finish. Think of documentation more like an instruction manual. Unless you're really into microwaves, I doubt you've ever sat down and read the manual cover to cover. Instead you probably looked through the table of contents for the section that might contain instructions on how to solve your problem. Welp, same-same guys.

## 2. If you don't understand, don't panic
😖 Easier said than done, I know, but accepting that documentation isn't necessarily written with n00bs in mind will save you a lot of heartache. Most documentation authors are pretty seasoned coders aka _Power Users_ and much of the info you think is missing, they likely think is implicit. Or they're lazy. Probably a mix of both! #programmers

## 3.  HTTP methods
Usually API documentation will serve up a list of the names of methods (or functions if you prefer, ) available to you. Often with a GET, POST, PUT or DELETE next to them.

- __GET__ lets you retrieve - aka get - something
- __POST__ lets you create something
- __PUT__ lets you update something
- __DELETE__ lets you remove - aka delete - something

## 4.  HTTP status codes
When you make an HTTP request you will get one of any of these codes back. It's always helpful to have a handle on what they mean, even if most of the time you'll be provided with details via the console.

- __200__ : success!
- __400__ : bad request (often you're fault, extra details are usually shown)
- __401__ : you're not authorized to make the request you're making
- __403__ : forbidden -- while you're request was correct, you're not allowed access
- __404__ : the thing you're looking to access can't be found
- __410__ : the API endpoint has been turned off
- __429__ : the application's rate limit has been reached, you've been cut off
- __500__ : internal server error
- __503__ : service unavailable -- the servers are working but overloaded
- __504__ : gateway timeout -- server-side issue


## 5. Don't get hung up on terminology
My mother used to be an ESL (English as a Second Language) teacher, and went to great pains to get her students keep reading when they hit a word they didn't immediately understand. Her thinking was such that if they kept reading, they'd soon be able to infer the meaning or tone of the unknown word thanks to the context of the rest of the text. Of course this doesn't apply to you if you understand less than 70% of what you're reading. But otherwise, force yourself to keep reading that tutorial/get started/insert-type-of-doc-here... it may very well 'all make sense later.'

## 6. Simple > Complicated
For me the true key to reading docs has been recognizing when a library or framework just doesn't work with thought process. Most of the time when I'm looking for a plugin, library or framework for a specific project or problem, most of my search-time is spent looking for the solution that seems the most obvious to me. I just don't see any reason in forcing my mind to bend in ways that feel unnatural  to it when there are _so many_ different approaches available out there. If the whole JS fatigue debate has taught us anything this past year, I think it would be that there isn't a one size fits all solution out there, and * shocker * that's ok! Finding tools that actually make sense to you will go a ways in giving you the confidence to tackle what might still be slightly confusing documentation.
