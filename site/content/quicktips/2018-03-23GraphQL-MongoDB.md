+++
date = "2018-03-26T00:00:00Z"
tags = ["quicktips", "tooling", "DNS", "containers"]
title = "Gatsby + Cockpit"
draft = false
type = "quicktips"
+++

This post is going to walk you through how to programmatically generate pages in a <a href=“https://www.gatsbyjs.org/” target=“_blank”>Gatsbyjs</a> project, from collections created in a database, accessed through the <a href=“https://getcockpit.com/” target=“_blank”>Cockpit</a> CMS.

## But first, some context:

I recently dove into Docker and very quickly found myself confronted by a pretty deep ocean of new information, which I’ve catalogued in parts <a href=“https://www.unicornsfartpixels.com/quicktips/2018-03-15docker/” target=“_blank”>one</a> and <a href=“https://www.unicornsfartpixels.com/quicktips/2018-03-15docker-compose/” target=“_blank”>two</a> of my Docker (not so quick) quicktips series. **Going forward, this post assumes that, for the most part, all things Docker have been taken care of.**

I honed all this newfound knowledge by setting up a project that uses Gatsbyjs and Cockpit - a CMS that allows you to manage things like site contributers, and do things like add too and query from a database. Insodoing, I stumbled onto a whole bunch of _other_ new knowledge (business as usual if you venture into the rabbit hole deep enough...) not directly related to do Docker, but that allowed me to understand Gatsby more than I ever had before.

## Cockpit + Gatsby = <3

So, Gatsby is kind of great. It’s super fast, runs on top of React, and is really easy to set up thanks to a host of handy plugins. Like for example, <a href=“https://www.npmjs.com/package/gatsby-source-cockpit” target=“_blank”>gatsby-source-cockpit</a>, which allows you to bridge Cockpit with Gatbsy.

### Configuring Gatsby

To be able to programmatically generate pages for our site, we’ll need to set up three plugins in our `gatsby-config.js` file: **gatsby-source-filesystem**, **gatsby-source-cockpit** & **gatsby-transformer-remark**

```Javascript
module.exports = {
  siteMetadata: {
    title: `Gatsby + Cockpit = <3`
  }, plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: []
      }
    },
    {
      resolve: `gatsby-source-cockpit`,
      options: {
        host: 'http://cms',
        accessToken: 'ffe37d499c14d9372e1afa87e445fd',
        collectionName: ['Pages']
      }
    }
  ]
};
```

**gatsby-source-filesystem** is a plugin that creates nodes based on files in a specific directory, which allows us the ability access them using GraphQL (along with a bit of code - more on that in a minute.) In this example, we’re turning files in the `/src` folder into nodes, which we’ll then be able access and manipulate.

**gatsby-source-cockpit** is a plugin that allows us remote access to the Cockpit API - aka any data we have stored in MongoDB. As the data is pulled into Gatsby via the Cockpit plugin, it all gets turned into nodes. Huge thanks to <a href="https://twitter.com/michelangelopm">Mike Partipilo</a> for making this plugin and being so forthcoming with my (many) questions as I built out this project. The open source community really is amazing <3

**gatsby-transformer-remark** is a plugin than takes your markdown and turns it into elements that are readable by the browser, as **HTML**. When you create collections in Cockpit, be sure that any content fields you may set have the field type **Markdown**. (The Cockpit plugin supports either markdown or **HTML** so you _can_ leave this plugin out if you prefer, and just set your content field type to **WYSIWYG** .

Fun fact: Gatsby pretty much runs on nodes. Any source plugins will basically turn whatever they’re helping with into nodes that Gatsby can play with via GraphQL - nodes based on which your project's GraphQL schema will be generated.

## Networking in Docker

I went over this in my <a href=“https://www.unicornsfartpixels.com/quicktips/2018-03-15docker-compose/” target=“_blank”>Docker</a> post, but imo it bears repeating because networky stuff can be tricky: when setting everything up in docker-compose, a bunch of ports are mapped so that the browser can access the containers. So basically `Ports` is used to make containers accessible to the outside world.

So far, so good.

But if Cockpit is running from one container, and Gatsby from another, neither care about the outside world. Only we do, because we're in it. So when it comes to Gatsby getting at the data stored in our Mongo database - which if you recall, we are managing through Cockpit - Gatby’s only real concern is the original container port, which the fine folks over at Cockpit exposed for us when they created the initial image - port `80`, at your service!

Here’s a quick refresher of the services as they are laid out in our `docker-compose.yml` file. Remeber that for ports, it goes **HOST_PORT:CONTAINER_PORT**.

Also notice that our **web** service (Gatsby) has a `depends_on: -cms` (Cockpit) which means our Gatsby container will look to Cockpit’s **CONTAINER_PORT** and not it’s **HOST_PORT**\* when querying for data.

**\***(the host port == the browser address accessed by our computer through the browser, which provides access to the Cockpit CMS gui... which services users, who can log in, add data to the database, and post it to the site... data that we will funnel into our Gatsby project by _programatically generating pages_...)

```Javascript
services:
  db:
    image: 'mongo'
    volumes:
      - 'mongo-vol:/data/db'
    networks:
      - banana
  cms:
    image: 'aheinze/cockpit'
    ports:
      - "8080:80"
    environment:
      COCKPIT_SESSION_NAME: cockpit
      COCKPIT_SALT: //create-your-own//
      COCKPIT_DATABASE_SERVER: 'mongodb://db:27017'
      COCKPIT_DATABASE_NAME: cockpit_master
    depends_on:
      - db
    networks:
      - banana
  web:
    build: .
    ports:
      - "8888:8888"
    networks:
      - banana
    depends_on:
      - cms
```

So in a nutshell, we need to point our plugin to **http://cms/** from the web container, which you may have noticed, we did in our `gatsby-config.js` back up top in **Configuring Gatsby**.

## GraphQL w/ GraphiQL

At this point you should be able to boot up your project.

```Javascript
$ docker-compose build
$ docker-compose up
```

### Configuring Cockpit

Before we can see anything actually rendered out into our Gatsby project, we need to create some data. So head to <a href="http://localhost:8080/install">http://localhost:8080/install</a> to configure the CMS and add some content.

First, create a `collection` called `Pages`, and give it the following fields: **title**, **content**, **tags** & **slug**. Make sure the field type for **content** is set to _Markdown_ and check that **slug** is a required field, and that it's field type is set to _Text_. We'll use slugs to generate the urls for each programatically generated page. If your're not sure how to do this, check out the <a href="https://getcockpit.com/documentation">Cockpit Docs</a>, they are amazingly straightforward.

You can now go to town creating pages!

### GraphiQL

At this point, you should be able to access <a href="localhost:8888/___graphql">localhost:8888/\_\_\_graphql</a> without any problems, and use the query below to see the collection of pages you've just created in Cockpit. Great! We have some data to feed into our project.

```javascript
allCockpitPages {
      edges {
        node {
          id
          entry {
            title
            content
            tags
            slug
          }
        }
      }
    }
```

<img src="/images/graphql1.png">

## gatsby-node.js

Now we can start to really hook things up. Create a `gatsby-node.js` in the root of your Gatsby project, in the same place as the `gatsby-config.js` file. This file is pretty key as it allows us to configure any Gatsby Node APIs we might need, like for example, `createPages`:

```javascript
const path = require('path');

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const pageTemplate = path.resolve('src/templates/new-page.js');

    graphql(`
      {
        allCockpitPages {
          edges {
            node {
              entry {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allCockpitPages.edges.forEach(({ node }) => {
        createPage({
          path: node.entry.slug,
          component: pageTemplate,
          context: {
            slug: node.entry.slug
          }
        });
      });
      resolve();
    });
  });
};
```

On execution, `createPages` gives us back a Promise that has grabbed the data we need - in this case, our future page slugs.

Navigating now, to <a href="http://localhost:8888/qsdgqsfg">http://localhost:8888/qsdgqsfg</a> should redirect you to a **404** page featuring a list of the pages you created in Cockpit. If you see them, everything is working, and we can create our **page template**, for which you may have noticed we've already created a variable in our `gatsby-node.js` above.

## Programmatic magic - creating a template

Possibly the mose satisfying part of this whole process is found in these next steps. First, in `src/templates/new-page.js`, we're going to create an empty stateless component, and just underneath, set up our GraphQL query.

If you're new to GraphQL, there are a few things to note:

To start things off, we're using a `$variable` to take advantage of GraphQL's dynamic potential - any pages we create within our Cockpit collection that have a slug (remember when I told you take make slugs a required field?) will be included in this page's query.

So we first state that we want our query to accept a variable that we're calling `$slug`, and that it absolutely has to be a string.

Next, within the query itself, we're telling Cockpit to grab data from the `entry` field, _per slug_. We don't need to explicitly include **entry** in our query here, as we've already set it in our **gatsby-node.js** config.

```Javascript
import React, { Component } from 'react';
import Link from 'gatsby-link';
export default ({ data }) => {
  return (
    <div>
    </div>
  );
};
export const query = graphql`
  query PageQuery($slug: String!) {
    cockpitPages(entry: { slug: { eq: $slug } }) {
      id
      childCockpitPagesContentTextNode {
        internal {
          content
        }
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
```

The second half of the query refers to our content, which has already been treated by **gatsby-transformer-remark** plugin, which is why there now exists the `childMarkdownRemark` query field. What we want is the `html` field, in order to render content into our project.

<img src="/images/graphql2.png">

Now we can set up our component, and programatically generate some pages. Simply add the following into the component's return statement:

```HTML
<div>
  <div
    dangerouslySetInnerHTML={{
      __html: page.childCockpitPagesContentTextNode.childMarkdownRemark.html
    }}
  />
</div>
```

**FYI** - `dangerouslySetInnerHTML` is a <a href="https://reactjs.org/docs/dom-elements.html">React thing</a> that replaces **innerHTML** in the DOM.

Now, if you head back to your 404 page and click on any of the pages listed... if everything has been hooked up properly... you should see a new page appear, with your slug and any content you've included **\o/**.

**↳** If you're getting hit with any errors, feel free to compare and contrast with the <a href="https://github.com/elizasj/gatsby-story-cockpit-docker" target="_blank">original project</a> files.

## Next Steps...

Did you know that in Gatsby, you can’t make any GraphQL queries outside of the Layout or Pages sections of your project? A nasty little suprise indeed... Lucky for us we can work around this issue using GraphQL fragments, which I explain next, in <a href="https://www.unicornsfartpixels.com/quicktips/2018-04-01graphql-fragments/">GraphQL Fragments</a> 👈.
