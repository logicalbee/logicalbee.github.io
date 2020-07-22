---
layout: post
title: Add Google Adsense with Gatsby
description: Add Google Adsense with Gatsby, Gatsby is a free and open source framework based on React, Gatsby helps to build blazing fast and reliable webapps. 
permalink: /add-google-adsense-with-gatsby

---

This Artical is all about how to Add Google Adsense with Gatsby, Gatsby is a free and open source framework based on React, Gatsby helps to build blazing fast and reliable

#### Features
- Progressive Web Apps
- Scale to the entire internet
- Fast
- Easy To Implement

#### Place Ads in Gatsby with Google Adsense
#Step 1: Installation
```javascript
npm install --save react-adsense
or
yarn add react-adsense
```
#Step 2: Add the script at the end of HTML
```javascript
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
```
#Step 3: Import Package
```javascript
import React from 'react';
import AdSense from 'react-adsense';
```
#Step 4: Usage
```
// ads with no set-up
<AdSense.Google
  client='ca-pub-NNNNNNNNNNNNNNNN'
  slot='7806394673'
/>

// ads with custom format
<AdSense.Google
  client='ca-pub-NNNNNNNNNNNNNNNN'
  slot='7806394673'
  style={{ width: 500, height: 300, float: 'left' }}
  format=''
/>

// responsive and native ads
<AdSense.Google
  client='ca-pub-NNNNNNNNNNNNNNNN'
  slot='7806394673'
  style={{ display: 'block' }}
  layout='in-article'
  format='fluid'
/>

// auto full width responsive ads
<AdSense.Google
  client='ca-pub-NNNNNNNNNNNNNNNN'
  slot='7806394673'
  style={{ display: 'block' }}
  format='auto'
  responsive='true'
  layoutKey='-gw-1+2a-9x+5c'
/>



```

**Credit:[https://github.com/hustcc/react-adsense](https://github.com/hustcc/react-adsense)