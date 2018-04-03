+++
date = "2018-03-26T00:00:00Z"
tags = ["quicktips", "tooling", "DNS", "containers"]
title = "GraphQL Fragments"
draft = false
type = "quicktips"
+++

This post is going to walk you through how to programmatically generate a sidebar menu in a <a href="https://www.gatsbyjs.org/" target="_blank">Gatsbyjs</a> project, from collections created in a database, accessed through the <a href="https://getcockpit.com/" target="_blank">Cockpit</a> CMS.

## But first, some context:

This post is part of a larger series about setting up a basic site/blog using Docker, Gatsby, and the Cockpit CMS. If you are unfamiliar with how Docker works, take a look at parts <a href="https://www.unicornsfartpixels.com/quicktips/2018-03-15docker/" target="_blank">one</a> and <a href="https://www.unicornsfartpixels.com/quicktips/2018-03-15docker-compose/" target="_blank">two</a> of my Docker (not so quick) quicktips series, which will get you up and running with Gatsby and Cockpit.

I've also documented how to programmatically generate pages created via Cockpit in your Gatsby project using **MongoDB** & **GraphQL**, so feel free to chek out <a href="http://localhost:3000/quicktips/2018-03-23graphql-mongodb/" target="_blank">that post</a> if you haven't set things up just yet. Assuming you've followed the previous posts in this series, your project should be properly set up to follow along with this post.

## GraphQL Fragments

In Gatsby, you can't make any GraphQL queries outside of the **Layout** or **Pages** sections of your project unless you use fragments, which are these bits of query that you can pass into other queries. To be honest, when googling around I was hardpressed to find any information on fragments that wasn't paired with an Apollo tutorial and the GraphQL docs aren't very specific about how to actually implement them. I guess that's why they're tagged _advanced_ in the <a href="https://www.gatsbyjs.org/docs/querying-with-graphql/#fragments" target="_blank">Gatsby docs</a>...

> Fragments let you construct sets of fields, and then include them in queries where you need to.

But actually, fragments aren't very hard to use once you get the flow of information down. The trick for me, was to think of fragments like I would a ui component in React. If you build components _"the React way"_,
your ui component (aka presentational component) will get any data it's displaying from a container component. The _how things look_ versus _how things work_ paradigm.

## Main Concepts

When I originally tried to query my database from within a component using GraphQL, I got an error in my terminal explaining that Gatsby didn't allow queries outside of Pages & Layouts. I was prompted to instead use `co-location` and `fragments` to get my queries working. I was surprised at first because I can very easily make <a href="https://getcockpit.com/documentation/api/collections" target="_blank">fetch requests</a> to the same database from any component I want. But this is how GraphQL plays with Gatsby, and opting to do things this way instead of using `fetch()` actually allows us to use stateless components all the way through our project.

### Co-location

This basically means that you put the data requirements of a component into the same file where you also impliment the component itself. So for each component that requires a specific piece of data from the backend, we have to write what these requirements are and express them in the form of a GraphQL _fragment_.

### Fragments

In a nutshell, this is the **ui** part I mentioned above - the empty query fields that the query we'll be making from our main `/layouts/index.js` file will funnel data into.

## Fragmenting the Data

In our **PageListContainer** component, we're going to add a fragment just below our exported component. You might notice some subtle differences from the GraphQL queries we've been making so far in this series.

For example, there's no `query SomeQuery() {...}`but instead, the keyword `fragment` is used, followed by our fragment name and the GraphQL field that we'll be grabbing the data from. Since we're trying to populate a menu, all we need is the **title** of each data item. I've also included the **content** field here, but this only to keep the base query we'll be making later clean and simple. This is the data that will be made accessible to our component at runtime.

```javascript
export const cockpitTitlesFragment = graphql`
  fragment CockpitBaseDataFrag on CockpitPages {
    entry {
      title
    }
  }
`;
```

## The Parent Query

In our **TemplateWrapper** component, in **layouts**, we can go ahead and make a regular GraphQL query... with one tiny catch: instead of wirting out every field we want to query, we replace some of them with our **fragment name**. And that's it! You've made a working fragment query.

```javascript
export const query = graphql`
  query TemplateQuery {
    allCockpitPages(limit: 100) {
      totalCount
      edges {
        node {
          id
          ...CockpitBaseDataFrag
        }
      }
    }
  }
`;
```

## Rendering the Data

Now the real fun can begin, aka passing the data from the **TemplateWrapper** through **PageListContainer** (via **Sidebar**) and into **PageList** so we can actually see it rendered out onto the page.

### Information flow

Let's brake things down: right now, the base **TemplateWrapper** component accepts props of **children**. We need to include **data** as props too, to get our GraphQL data into our **Sidebar** component which will in turn pass on that data to **PageListContainer**.

Inside the **PageListContainer** component, we'll now be able to manipulate our data and funnel it into our **PageList** ui component, which will display our data (finally) on the page, in our sidebar.

`/layouts/index.js`

```javascript
const TemplateWrapper = ({ data, children }) => (
        ...

             <Sidebar data={data} />
            ...

         {children()}
        ...
);

export default TemplateWrapper;

export const query = graphql`
  query TemplateQuery {
    allCockpitPages(limit: 100) {
      totalCount
      edges {
        node {
          id
          ...CockpitBaseDataFrag
        }
      }
    }
  }
`;
```

`/components/sidebar/index.js``

```javascript
const Sidebar = ({ data }) => (
  <div className={styles.sidebar}>
    <div>
       ...
        <PageListContainer data={data} />
       ...
    </div>
  </div>
);

export default Sidebar;
```

`components/PageListContainer/index.js`

```javascript
const PageListContainer = ({ data }) => (
  <div>
    {data.allCockpitPages.edges.map(({ node }) => (
      <div key={node.id}>
        <PageList data={node.entry.title} />
      </div>
    ))}
  </div>
);

export default PageListContainer;

export const cockpitTitlesFragment = graphql`
  fragment CockpitBaseDataFrag on CockpitPages {
    entry {
      title
    }
  }
`;
```

`components/PageList/index.js`

```javascript
const PageList = ({ data }) => (
  <ul className={styles.test}>
    <li key={data._id}>{data}</li>
  </ul>
);

export default PageList;
```

Congrats! At this point you've not only programatically generated pages, but you've also extracted GraphQL queries out into your wider project components. If you're getting hit with any errors, feel free to compare and contrast with the <a href="https://github.com/elizasj/gatsby-story-cockpit-docker">original project</a> files.

And ...drumroll... that brings this series to a close**\***! 

I hope this proved helpful for some. It certainly taught me a lot. Speaking of which, __a small disclaimer to conclude:__ I created this series as I was learning how to use pretty much every technology included in these posts. Which implies that my understanding might not be 100% accurate accross the board, I run the risk of having missed some best practices along the way. There are most certainly ways to refactor and simplify my code too... which I'm totally open to! If you have advice and want give it, <a href="https://twitter.com/iamelizasj">find me on twitter</a>. In the meantime, you now have a really ugly-but-working skeleton of a site, ripe for the personalizing. So go wild and make something great! 

**\*** I may at some point append this series with Docker (pt.3) - going from development to production. Depends how fast I get there myself ✌️
