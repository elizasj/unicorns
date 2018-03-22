+++
date = "2018-03-22T00:00:00Z"
tags = ["quicktips", "tooling", "DNS", "containers"]
title = "Docker (pt2)"
draft = false
type = "quicktips"
+++

Docker really clicked for me when I started using <a href="https://docs.docker.com/compose/overview/" target="_blank">docker-compose</a>, which feels like a Dockerfile that sits on top of a bunch of Dockerfiles (or rather, the images they describe...) telling them how to play nice with each other. The more technical way of saying this would be that Docker runs at build time, whereas Docker-compose runs at run time.

In <a href="">part1</a> we set up our local Gatsby project, which already has it's image. Instead of writing two more images, I'm going to pull some pre-made ones from <a href="https://hub.docker.com/" target="_blank">Docker Hub</a> for the cms and database I want to hook up to my project. 

(__Hint:__ official project images > random user uploaded images, as they are most trustworthy.) 

We could tediously run each image from the terminal using commands similar to the one outlined in <a href="">part1</a>, but docker-compose exists so that we don't have to. Instead we can create a `docker-compose.yml` file in the same place as our initial Gatsbyjs Docker file, to get things running from a single source. All that's left to do after that is run 

```JSON
docker-compose up
```
from the terminal to boot everything up, which of course sounds simple enough... but (surprise) there are some networking and environment variable things that need to be taken into account.

In this example we’ll be hooking up our gatsby project, with a cms called <a href="https://hub.docker.com/r/agentejo/cockpit/" target="_blank">cockpit</a>, which we'll connect to <a href="https://hub.docker.com/_/mongo/" target="_blank">mongodb</a>. So a total of three images are going to be linked together through their container instances.

First things first, set your `version` of docker compose (I'm using __v 3__)

```javascript
//docker-compose.yml
version: '3'
```
Next, we list out the various `services` that we’ll be using. Services are run via images. So each service runs an image that creates a container. I named them `db`, `cms` and `web` but you can call your services whatever you want. Since my Gatsbyjs project is running from a local development image, and our `docker-compose.yml` file is in the same location, I include `build .` instead of pointing to a pre-made image.
Don't forget to define the ports you want to map so things load properly in the browser. 

__N.B since users won't be interacting with mongoDB directly, but instead via our cms, that particular port with be set later on, using cockpits environment variables.__ 

```javascript
//docker-compose.yml
version: '3'
services:
  db:
    image: 'mongo'
  cms:
    image: 'aheinze/cockpit'
    ports:
      - "8080:80"
  web:
    build: .
    ports:
      - "8888:8888"
```

Add a network (or `networks`, which is why the heading is always plural. In our case we need just one.) Again, you can call your network whatever you want 🍌.

Inside our network, we set a `bridge` (which does what you might expect… bridges things together over the network we set.) We could create a bridge ourselves, but we're using the default that comes built in, since it does the trick as is. Each has it’s merits which you can read up on <a href=“https://docs.docker.com/network/bridge/“ target="_blank">here</a>

```javascript
//docker-compose.yml
version: '3'
services:
  db:
    image: 'mongo'
  cms:
    image: 'aheinze/cockpit'
    ports:
      - "8080:80"
  web:
    build: .
    ports:
      - "8888:8888"
networks:
  banana:
    driver: bridge
```

Now define a volume (or `volumes` - which is why the heading must always be plural. In our case we need just one.) In the Gatsby project we used a bind mount, but if you remember, you can also define your own volumes. Which proves handy in our case, as we need something to  contain the data we’ll want to serve out to the __mongodb container__ every time we boot up the system. In your terminal: 

```JSON
docker volume create --name whatever-you-want-to-name-your-volume
```

Double check to see it’s been created,

```JSON
volume list
```

then add it to your `docker-compose.yml`

```javascript
//docker-compose.yml
version: '3'
services:
  db:
    image: 'mongo'
  cms:
    image: 'aheinze/cockpit'
    ports:
      - "8080:80"
  web:
    build: .
    ports:
      - "8888:8888"
networks:
  banana:
    driver: bridge
volumes:
  mongo-vol: null
```

Within each service (__db__, __cms__, __web__) add the network they will be communicating through.

```javascript
//docker-compose.yml
version: '3'
services:
  db:
    image: 'mongo'
    networks:
      - banana
  cms:
    image: 'aheinze/cockpit'
    ports:
      - "8080:80"
    networks:
      - banana
  web:
    build: .
    ports:
      - "8888:8888"
    networks:
      - banana
networks:
  banana:
    driver: bridge
volumes:
  mongo-vol: null
```

In your __db service__, connect the volume you created to the database path (this set up info is usually explained on docker hub, so it can be different if you’re using a different image, but this is how it works with Cockpit.)

```javascript
//docker-compose.yml
version: '3'
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
    networks:
      - banana
  web:
    build: .
    ports:
      - "8888:8888"
    networks:
      - banana
networks:
  banana:
    driver: bridge
volumes:
  mongo-vol: null
```

Netxt, configure the environment variables of the service that is dependant on the database (our cms, cockpit) and point it to the database.

Again, these details should be specified on docker hub or in the docs… in the case of cockpit, a bit of digging needed to be done. Hat tip to <a href="https://twitter.com/_superseed" target="_blank">@superspeed</a>, who helped me find this info, and who also repeatedly hashed out Docker's more confusing parts with me 🙏🙏. 

As mentioned earlier, this is where you'll connect the cms to the database server, in this case the __COCKPIT_DATABASE_SERVER__ . Something else of note, we need to add `depends_on: - cms` to our web service, in order to be able to query our mongoDB data from within our Gatsby project using GraphQL. (I'll be writting a short post specifically about the intricacies of setting up Gatsby & Cockpit in a future post. So stay tuned for that if you're curious)

```javascript
//docker-compose.yml
version: '3'
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
networks:
  banana:
    driver: bridge
volumes:
  mongo-vol: null
```

__Tip:__ Send your .yml file through a linter and save yourself some weird error messages. Once you're cleared, you're good to go! Run 

__Other Tip:__ generate your `COCKPIT_SALT` by typing `uuidgen` into your terminal.

All that's left now is to run

```JSON
docker-compose up
```
and watch your docker-compose file spin everything up into life!

## Extras: exposing ports, a visualisation

As I've mentioned previously, on a mac Docker needs to reach outside it's vm so that when your containers run their various servers, the urls can be redirected to the exposed ports. Here's how it works under the hood on a mac, and how the VM on your mac works with Docker.

##### Docker for Mac
<img src="/images/DockerMac.png">

#### Linux Virtual Machine
<img src="/images/DockerLinux.png">

Containers can be represented as boxes that interface with the 'outside' via ports. These interfaces each have IP addresses, and the containers open ports for the apps inside to access the outside. Containers can be bridged together, and the docker daemon maps those open container ports to the outside world, the 'real ports' illustrated in the first diagram. This makes the containers accessible through localhost (or the host’s IP address) instead of just the container IP/port.

#### Some handy docker command line stuff :

- - __Docker image ls -a__ (see all your images)
- - __Docker container ls -a__ (see all your containers)
- - __Docker container stop__
- - __Docker container rm__ (remove a container)
- - __Docker container rm -f__ (force the removal of a container)
- - __Docker image rmi__ (container must be stoped to kill an image)
- - __Docker container prune__ (get rid of unused containers)
- - __Docker image prune__ (get rid of unused images)
- - __Docker volume prune__ (get rid of unused volumes)
- - __Docker volume list__ (list out volumes)