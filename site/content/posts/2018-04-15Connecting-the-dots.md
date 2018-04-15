+++
date = "2018-04-01T00:00:00Z"
tags = ["tooling", "DNS", "containers"]
title = "Connecting The Dots"
draft = false
type = "posts"
+++

What naively started out as a "quick project" to get the hang of **Docker** has since morphed into something else altogether. But the journey has been well worth it as I came out the other end with a ton of useful knowledge I didn't realize I had been missing out on. (You don't know 'till you know... Programer life ftw!)

## The idea

I thought setting up a blog with contributer logins would be a simple way to work out how to use mutliple docker containers together - and it totally was. But as is usually the case when diving into things, there turned out to be way more moving parts that I'd anticipated: **Docker**, **GatsbyJS**, **Storybook**, **Cockpit CMS**, **MongoDB**... I learned a ton about networking (because Docker presupposes quite a bit of knowledge in that area,) how **Gatsby** and **GraphQL** really work together, how to template within GraphQL queries, how to programatically generate pages within a Gatsby project from an outside source, and how to hook up a CMS to a static site using, of course, **Docker**.

Phew, that's quite a bit of things indeed.

And while it's definitely a specific stack - including, last but not least, getting **Storybook** working with **Gatsby** - there are a lot of individual takeaways in there as well. So what I've done is created a series of posts which can be followed top to bottom as a guide to setting up a Docker development environement for a blog project, but which you can pick and choose from depending on your needs/curiosity:

## The goods

* **`Part One:`** Setting up your first **Docker** container (with **Gatsby**) [<a href="https://www.unicornsfartpixels.com/quicktips/2018-03-15docker/" target="_blank">here</a>]

* **`Part Two:`** Coordinating multiple **Docker** containers (**Gatsby** + **CockpitCMS**) [<a href="https://www.unicornsfartpixels.com/quicktips/2018-03-15docker-compose/" target="_blank">here</a>]

* **`Part Three:`** Programatically generating pages in **Gatsby** using **GraphQL** [<a href="https://www.unicornsfartpixels.com/quicktips/2018-03-23graphql-mongodb/" target="_blank">here</a>]

* **`Part Four:`** Using GraphQL Fragments to query outside of **Gatsby's** _Layout_ & _Pages_ section [<a href="https://www.unicornsfartpixels.com/quicktips/2018-04-01graphql-fragments/" target="_blank">here</a>]

## Disclaimer

I created this series as I was learning how to use pretty much every technology included in these posts. Which implies that my understanding might not be 100% accurate accross the board, I run the risk of having missed some best practices along the way. There are most certainly ways to refactor and simplify my code too... which I'm totally open to! If you have advice and want give it, <a href="https://twitter.com/iamelizasj" target="_blank">find me on twitter</a>. In the meantime, you now have everythign you need to create an albeit ugly (but working) skeleton of a site, ripe for the personalizing. So go wild and make something great!

## To Be Continued?

I may at some point append this series with

* **`Part Five:`** Cockpit Webhooks & Gatsby - automating sight rebuild for newly created pages
* **`Part Six:`** Docker (pt.3) - going from development to production.

Depends how fast I get there myself. Stay tuned! ✌️
