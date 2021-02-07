---
layout: post
title:  "iOS Inspector Troubleshoot"
image: https://i.imgur.com/2i0w2l3.jpg
date:   2018-02-22 20:20:00 +0000
author: Dale
intro: Having problems with your iOS device disconnecting when your trying to inspect with Safari? in this post we list what could be the cause and how to fix it.
categories: safari ios osx xcode
---

One great thing about testing browser based apps or websites on the iPhone or iPad is that you can inspect it using Safari inspector.

## Getting started

1. In OSX open Safari and go to **"Safari > preferences > advanced"** and tick **"Show develop menu in menu bar"**.

2. In iOS go to **"Settings > Safari > Advanced"** and turn on web inspector.

3. Inspect your device by plugging it in to your mac and going to **"Develop > your-device-name"** in the toolbar.

## The problem

Unfortunately if you do this for some time you will undoubtably run in to an issue where you go to inspect the device then safari disconnects from it (no longer in the menu).

{% include article-adsense.html %}

You may have tried to restart Safari or re-plugin the device, however this doesn't always work.
In this article I talk about several methods that I have tried to remedy this problem.

1. Update both OSX and iOS versions of Safari
   I have found after having the latest of both versions it started working, this could be down to debugging incompatibilities between safari versions.

2. Check that web inspector in iOS is enabled,
   it has been known that this setting can be switched off after an upgrade or perhaps your testing on a different device and forgot to enable it.
   On your iOS device check in **"settings > safari > advanced > web inspector"** and make sure it's enabled.

3. Check the port you are connected to
   I have had mine plugged into a cheap hub / via apple keyboard / monitor hub and found that going directly into the mac is much more reliable.

4. Are you using a good quality cable?
   Better quality / official cables that aren't worn out have better reliability when in debug, I have experienced moving a bad cable around and it disconnecting/connecting in Safari.

5. Other notable observations
   Other people have commented that making sure cookies are enabled in safari, enabling private mode and trying whilst Xcode is open have affected the reliability of this, although I haven't seen this myself it may help others to try.

Being able to inspect your device in Safari is a great tool but it can be frustrating when it doesn't work as expected, hopefully some of the tips above will work for you and you will spend less time debugging debugging!
