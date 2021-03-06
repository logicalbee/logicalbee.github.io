---
layout: post
title: What happens when you type url in browser?
summary: The communication between your client and a web server can be divided into the following components.
tags: [computer network, TCP/IP]
permalink: /what-happens-when-we-type-url-in-the-browser
created: 2021-05-14
featured: true
date: 2021-05-04
---


## What happens when you type url in browser?

The communication between your client and a web server can be divided into the following
components.

<iframe width="560" height="315" src="https://www.youtube.com/embed/GqGZ5zwRCtU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Assumptions: You are on a Linux client and trying to connect from your Comcast home cable connection.

– DNS
– Network communication 
– HTTP

## DNS: 
A DNS lookup resolves http://www.google.com. At first the Linux client will look in it’s name service cache daemon to see if this request has been cached from before. If not, then the request has to be sent to the name server. This happens when the dns request is sent to the name server specified in your /etc/resolv.conf on the client. The DNS resolver is usually your local router if you are at home. The router will forward all DNS requests to the resolver specified in it’s configuration,
       
which it may have gotten from Comcast. The Comcast DNS server will forward this request to the .com root name servers. These will look up the NS of google.com. google.com name servers are specified when the domain is registered with the registrar. The request is then sent to to the google.com name servers which will look up http://www.google.com in their zone files and reply with the request. There is a forward lookup and a reverse lookup zone file. The forward lookup matches hostname to IP address. There are two kinds of requests that are made, one is a recursive and the other is a non recursive. A recursive query is when the client requests an answer which the DNS server has to find out and return. A non-recursive query is when the DNS server does not return the end answer, it’s upto to the client to find that out by talking to the next resolver in line. Keep in mind that each DNS server may have it’s own cache, so at any point in time the reply may come from cache if an answer is available. Caching has it’s own intricacies, and I will cover that in a DNS related blog.

## Network communication:
Network communication is when a 3 way TCP handshake happens between the client and the server, that includes a syn, sync-ack, and then an ack. Once the client has the IP address from the above DNS it makes a connection to the server. The client in our case will use it’s routing table to see if there is an entry for google.com’s network, if there is no entry, then the client will send the request for connection or sync packet to the default gateway. The default gateway does the same thing, it tries to find an entry for the the destination network, and when it cannot find it the packet is sent to the default gateway. This happens until the packet reaches the Internet gateway which is running BGP. The BGP routing table contains the list of all public IP address that have been assigned by ISP’s. This will contain google.com’s public IP address and the way to get to it. Comcast will then set the destination address of the packet to belong to google.com and send it across the Internet. Once it reaches http://www.yahoo.com, the destination will acknowledge the SYNC packet with an ACK and also send it’s own sync. This is the 2nd part of the 3 way TCP handshake. (Sync-Ack). The same routing happens on the way back at which point the client send an ACK and the connection is established. One important question to ask here is that how does the client know which host is in it’s network and which host is not? The answer is based on the netmask. For instance is the client IP is 10.1.1.100 and the netmask is 255.255.255.0, the client knows that the range 10.1.1.[0-256] is it’s local area subnet, and the rest is outside of the local area subnet. The client uses ARP or address resolution protocol to figure out which MAC address to send the packet to at layer 2. If the default gateway is 10.1.1.1, the client will send an ARP request saying ‘Who has 10.1.1.1?’. This ARP request is
  
heard by the router which will then respond with it’s MAC address and the client will encapsulate the packet with the MAC address of the router.

## HTTP:
Once the destination receives the packet, let’s say http://www.google.com is running behind a http load balancer, in which case the load balancer can be using in-line or DSR. In-line means that the load balancer will handle all incoming and outgoing connection between the client and the http server. DSR or direct server return means that the incoming connections many come through the load balancer, but the outgoing connections will be between the web server and the client. Further details of this will be in my load balancer blog. Apache when it receives the incoming request on port 80 will then either use a forked process or a thread to pass the request to. Apache has two modes of running, one is worker.c and the other is pre-fork. In pre-fork Apache uses processes that have been forked. In worker.c it uses threads. Threads consumes less resources, but is more complex. Since pre-fork is by default, let’s say Apache forked off a process to handle our request.
If you are asked this question of ‘What happens when you type in in your browser?’, the above is a good start. At various points in the conversation you can talk more in depth about a particular topic. For instance with networking you can break down further and go into TCP/UDP differences and also talk about routing protocols such as RIP, OSPF, BGP. When it comes to DNS you can talk about the SOA record, what it means, and also about the other DNS records. Additionally you can talk about how to setup a BIND server. In regards to HTTP you can talk about how to setup Apache, difference between encrypted and un-encrypted traffic, and also go more in depth about SSL.






