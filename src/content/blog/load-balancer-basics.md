---
title: "Load Balancers Explained: Scaling Web Applications Beyond One Server"
description: "Why a single application server stops being enough, what a load balancer does, the common balancing algorithms, and how to choose between Apache, IIS and Nginx."
pubDate: 2015-05-08
tags: ["Load Balancing", "Nginx", "Scalability", "Web Servers", "Architecture"]
category: "Architecture"
draft: false
featured: false
readingTime: "10 min read"
---

## Overview

The World Wide Web is a major channel for almost every business, and the trend is toward building a web presence. Getting online is simple in principle: build a customer-facing web application and deploy it to a server. Suppose you start with the architecture below.

![Basic web architecture](/blog/load-balancer/common_system.png)

An HTTP server takes incoming HTTP requests and passes them to the application server, which runs your application.

For example, assume the application server can handle a maximum of 500 TPS (transactions per second). In other words, your application can process 500 requests every second.

> **Note:** TPS depends on many factors, including the physical configuration of the server (memory, processor, network and so on) and the application's architecture.

As your business grows, so does the load on your server. At some point, 500 TPS is no longer enough. You can scale the server up by improving its configuration. This is called **vertical scaling**. But the load keeps growing, and eventually a single server can't handle every request, however powerful it is. You then have to add another server.

There are several reasons to run more than one server, each with the application deployed:

1. You need more servers to handle more requests.
2. Hardware or network failures can make a single server unreachable. A backup server, also called a **failover server**, keeps the service running.
3. A natural disaster can take down the whole infrastructure in one location, so a server elsewhere is needed.

So a serious online business needs more than one server. The HTTP server decides which application server handles each request. That raises three questions:

1. How does the HTTP server know how many application servers exist and have the application deployed, and how do you configure several of them?
2. On what basis does the HTTP server route requests to the application servers?
3. How do you configure failover servers?

The rest of this article answers these questions.

## What is load balancing?

Load balancing distributes application requests across a group of servers. A load balancer uses different algorithms to decide where each request goes.

This article focuses on load balancing for web applications, but the idea applies in many places, including:

- DNS load balancing
- HTTP load balancing
- SSL load balancing
- Network load balancing
- Database load balancing
- Cloud load balancing

The diagram below shows the setup. The web server in the earlier diagram is replaced by a load balancer. A **cluster** is a group of servers that serve the same purpose. **App Server 1** and **App Server 2** are in one cluster.

![Load balancer distributing requests across a cluster](/blog/load-balancer/load-balancer-pg.png)

## The load balancer's role

A load balancer does four main jobs:

- **Route requests.** It acts as a reverse proxy and spreads application traffic across the servers using the chosen algorithm.
- **Health checks.** It checks the health of each server at regular intervals. If a server goes down, the load balancer stops sending requests to it. Once the server is back up, requests are routed to it again.
- **Session stickiness.** It keeps track of previous requests so that a user is served by the same server. For example, if user U1 is served by server A, all of U1's later requests go to server A. Stickiness is optional, and you can turn it on or off as needed. The load balancer can use the client IP address, a cookie or the URL to maintain it. Stickiness can work against the balancing algorithm.
- **Failover servers.** You can keep a list of reserved or backup servers. If none of the primary servers can serve a request, the load balancer sends it to a backup server.

## Types of load balancers

A load balancer can be a physical device or software. Choose based on your needs. [F5 BIG-IP](https://f5.com/) is a widely used hardware load balancer, and it supports balancing across multiple data centers.

Software load balancers work alongside HTTP servers. These are the most popular HTTP servers:

| HTTP server | Provider |
| --- | --- |
| Apache | Apache |
| IIS | Microsoft |
| Nginx | NGINX, Inc. |
| GWS | Google |

[Netcraft](http://news.netcraft.com/) runs a monthly survey of web server popularity, so you can follow the trend there.

Both hardware and software load balancers exist, so which one to choose depends on your business requirements. Nginx has published an article on [why you might choose a software load balancer](http://nginx.com/blog/five-reasons-use-software-load-balancer/).

## Choosing the right web server

Once you've decided to use a load balancer, choosing the right server software is the hard part. These are the factors to consider.

### OS compatibility, security and features

The table below compares Apache, IIS and Nginx, based on the [Wikipedia comparison of web server software](http://en.wikipedia.org/wiki/Comparison_of_web_server_software). Y means supported, N means not supported.

| Server | Basic | Digest | Secure | Virtual hosting | CGI | Admin console | IPv6 | HTTP/2 | Windows | Linux | OS X | Solaris | OpenVMS | z/OS | HP-UX | IBM i |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Apache | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y |
| IIS | Y | Y | Y | Y | Y | Y | Y | Y | Y | N | N | N | N | N | N | N |
| Nginx | Y | Y | Y | Y | N | Y | Y | Y | Y | Y | Y | Y | N | N | Y | N |

### Performance

Use open-source tools to measure web server performance. Examples include [Httperf](https://github.com/httperf/httperf), Apache Bench (`ab`) and [JMeter](https://jmeter.apache.org/). Disable all plug-ins before you benchmark. In the author's survey at the time, Nginx was slightly faster than Apache.

### Balancing algorithms

Load balancing uses algorithms to decide how to spread requests across a cluster, much as an operating system uses scheduling algorithms. Choose the one that suits your cluster. The most common ones are:

| Method | How it works | When to choose it |
| --- | --- | --- |
| Round robin | The default in most load balancers. Distributes requests evenly across all servers. | When all servers have the same capacity. |
| Weighted round robin | Like round robin, but each server has a weight. For example, if server A has weight 100 and server B has weight 50, server A gets two of every three requests and server B gets one. | When servers have different capacities. |
| Least connections | Sends each request to the server with the fewest active connections. | When servers have the same or different capacities, since it reacts to actual load. |

You can also write rules in a load balancer that route requests based on HTTP headers, cookies or request data.

## Web servers and load balancing methods

The table below lists the balancing methods each web server supports.

| Web server | Algorithms supported |
| --- | --- |
| Apache | Round robin, weighted round robin, least connections |
| IIS | Weighted round robin, weighted total traffic, least current request, least response time, server variable hash, query string hash, request hash |
| Nginx | Round robin, weighted round robin, least connections, IP hash |

## References

- [Comparison of web server software](http://en.wikipedia.org/wiki/Comparison_of_web_server_software)
- [Nginx upstream module documentation](http://nginx.org/en/docs/http/ngx_http_upstream_module.html)
- [Nginx load balancer admin guide](http://nginx.com/resources/admin-guide/load-balancer)
- [Netcraft web server survey](http://news.netcraft.com)

## Key takeaway

A single server eventually runs out of capacity or fails. A load balancer spreads requests across a cluster, checks server health and provides failover. Pick the algorithm and web server that fit your cluster's capacity, and keep session stickiness only where you need it.
