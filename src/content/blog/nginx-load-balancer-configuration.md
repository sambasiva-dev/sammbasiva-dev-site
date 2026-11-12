---
title: "Configuring Nginx as a Load Balancer"
description: "A hands-on guide to running two application instances behind Nginx: upstream clusters, round robin, weighted and least-connections algorithms, backup and failover servers, and session stickiness."
pubDate: 2015-05-15
tags: ["Nginx", "Load Balancing", "Reverse Proxy", "Configuration", "Architecture"]
category: "Architecture"
draft: false
featured: false
readingTime: "10 min read"
---

## Overview

Before you read this article, I recommend reading the [load balancer basics](/blog/load-balancer-basics/) article first. It covers the core concepts.

[Nginx](http://nginx.org/) is pronounced "engine-x". It is a free, open-source HTTP server, and there is also an enterprise edition. It is one of the fastest-growing web servers. At the time of writing, it served a large share of active websites. Unlike traditional servers that use threads to handle requests, Nginx uses an event-driven, asynchronous architecture. Nginx can also act as an IMAP/POP3 proxy. The [Nginx wiki](http://wiki.nginx.org/) has documentation, modules and add-ons.

## Use case

This article shows how to balance load across two instances of the same application. We will test three scenarios:

- Send multiple requests and confirm that the load balancer spreads them across instances.
- Take one server down and confirm that requests are served by the other instance.
- Try the different algorithms that Nginx supports.

For this setup, Nginx listens on port 80, and two instances of the application run on ports 8080 and 8081 on the same machine, under the context path `/lbtest`. To test instance 1 directly, open `http://localhost:8080/lbtest`. To test instance 2, open `http://localhost:8081/lbtest`.

## Environment setup

### Nginx

[Download](http://nginx.org/en/download.html) the Nginx binaries from the Nginx website and follow the [installation instructions](http://wiki.nginx.org/Install).

### Sample application

The original article used a sample application packaged as `loadbalancer.jar`. That file isn't in the source repository, so use any web application that serves `/lbtest` and shows which instance answered. Start two instances in separate terminals. Make sure you have a recent [Java runtime](https://www.oracle.com/java/technologies/downloads/) installed.

```bash
java -jar loadbalancer.jar --port=8080 name=Instance1
```

```bash
java -jar loadbalancer.jar --port=8081 name=Instance2
```

Open `http://localhost:8080/lbtest` in a browser. You should see **Welcome to Instance1**. Then open `http://localhost:8081/lbtest` to see the message from Instance2.

## Configure

Configuring a load balancer in Nginx is straightforward. Follow these steps:

1. Open `nginx.conf` in a text editor. Find the `http` directive and add the `include` line inside it:

   ```nginx
   http {
       include loadbalancer.conf;
       include       mime.types;
       default_type  application/octet-stream;
       ...
   }
   ```

2. You could put the load balancer configuration directly in `nginx.conf`. As a best practice, create a separate file for it. Create `loadbalancer.conf` in the `conf` folder of the Nginx root directory.

3. Open `loadbalancer.conf` and define the upstream cluster:

   ```nginx
   upstream mycluster {
       server localhost:8080;
       server localhost:8081;
   }
   ```

   `mycluster` is the name of the group of servers. You can name it anything you like.

4. Open `nginx.conf` and add a `location` block inside the `server` block, then save the file:

   ```nginx
   http {
       ...
       server {
           listen       80;
           server_name  localhost;

           location /lbtest {
               proxy_pass http://mycluster/lbtest;
           }
           ...
       }
   }
   ```

   `/lbtest` is the context path that the sample application already serves. This block routes every request for `/lbtest` to `mycluster`.

5. Restart Nginx.

The load balancer is now ready. Next, test it.

## Test

Nginx's load balancer sits in front of the two servers, so requests go through it rather than to a single instance. By default, Nginx uses the **round robin** algorithm. Open `http://localhost/lbtest` in a browser. The first request goes to server 1. Refresh the page, and the next request goes to server 2.

## Algorithms

Nginx supports these algorithms:

1. Round robin
2. Weighted round robin
3. Least connections
4. IP hash

Round robin is the default, and it distributes requests evenly. You can choose the algorithm that fits your business requirements.

### Weighted round robin

With weighted round robin, each server gets requests in proportion to its weight. For example, to split traffic 2:1 between server 1 and server 2, out of every three requests the load balancer sends two to server 1 and one to server 2.

Update the `loadbalancer.conf` file:

```nginx
upstream mycluster {
    server localhost:8080 weight=2;
    server localhost:8081;
}
```

A server with no weight defaults to 1.

### Least connections

With least connections, Nginx sends each request to the server with the fewest active connections. It tracks the connection count for each application server.

Update the `loadbalancer.conf` file:

```nginx
upstream mycluster {
    least_conn;
    server localhost:8080;
    server localhost:8081;
}
```

### Limiting connections per server

Nginx can also limit how many requests run in parallel on a server. Set the limit per server:

```nginx
upstream mycluster {
    server localhost:8080 max_conns=2;
    server localhost:8081;
}
```

With this setting, server 1 handles at most two requests in parallel.

## Backup server

For high availability, you can add a dedicated backup server that handles requests only when the primary servers can't. This is useful during deployments or planned maintenance, when you don't want the primary servers to take traffic:

```nginx
upstream mycluster {
    server localhost:8080;
    server localhost:8081;
    server localhost:8082 backup;
}
```

Here, the third server is a backup. It receives requests only when the first two can't serve them. If server 1 goes down, requests go to server 2, and if server 2 goes down, they go to server 1. If both are down, the requests go to server 3.

## Failover

The backup server covers the case where primary servers are unavailable. Sometimes a primary server fails a few times, and you want to stop sending it requests for a while. You can configure that with `max_fails` and `fail_timeout`:

```nginx
upstream mycluster {
    server localhost:8080 max_fails=2 fail_timeout=30s;
    server localhost:8081;
}
```

- **`max_fails`** is the number of failed attempts Nginx allows before it marks the server as unavailable. The default is 1.
- **`fail_timeout`** is how long Nginx waits before trying that server again after it reaches `max_fails`. It also sets the window in which failures are counted. The default is 10 seconds.

With this configuration, Nginx acts as a simple circuit breaker. If server 1 fails to respond to two consecutive requests, Nginx stops sending it requests for 30 seconds.

## Session stickiness

By default, Nginx doesn't support session stickiness, which means sending a user's requests back to the server that handled their earlier requests. To enable it, you need the third-party [nginx sticky module](https://bitbucket.org/nginx-goodies/nginx-sticky-module-ng/downloads). You download it and build Nginx with it.

With the module, Nginx can route sessions based on the client IP address, URL encoding or cookies. The configuration below uses a cookie and a URL parameter:

```nginx
map $cookie_jsessionid $route_cookie {
    ~.+\.(?P<route>\w+)$ $route;
}

map $request_uri $route_uri {
    ~jsessionid=.+\.(?P<route>\w+)$ $route;
}

upstream mycluster {
    server localhost:8080 route=server1;
    server localhost:8081 route=server2;
    sticky route $route_cookie $route_uri;
}
```

`route=server1` and `route=server2` name each server. The first `map` block extracts the server name from the `jsessionid` cookie. The second `map` block extracts it from a `jsessionid` URL parameter. Nginx checks the cookie first, and falls back to the URI if the cookie doesn't contain a route.

## Key takeaway

Nginx makes a practical load balancer. Define an `upstream` cluster, proxy the path to it, and then tune the setup with a balancing algorithm, weights, backup servers, failover settings and, if you need it, session stickiness.
