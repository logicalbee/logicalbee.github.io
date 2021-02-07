---
layout: post
title:  "Styling Input Range"
image: https://i.imgur.com/QDCL5dQ.jpg
date:   2018-02-04 18:25:23 +0000
author: Dale
intro: HTML5 input range fields are great but they looks different in every browser, in this post we style them to be uniform across browsers.
categories: css html
---

The range input was introduced in HTML5 but the style differs wildly between browsers in this post I will talk about how to style this element to look the same in all modern browsers.
The idea is to have a friendly looking range input and label that responds to the users input, the user gets updated feedback on focus, hover, and change.
```html
<div class="rangeWrapper">
  <div class="label">
    <span>Range </span>
    <output id="rangeoutput">0</output>
  </div>
  <input
    id="rangeinput"
    type="range"
    value="0"
    min=0
    max=100
    oninput="rangeoutput.value = value"
  />
</div>
```
Here is my markup it is a wrapper thats contains a label div with an output container as a child and an input of type range.
The output element can be used to display the value of the range input by using the `oninput` attribute on the input element and using the id of the output element, in this case `rangeoutput.value = value`.
You can also use the "onchange" attribute the same way but the downside to this is that it only updates when the user has released the slider, this means the user can’t see the current value whilst dragging, choose the best one for your use case.

{% include article-adsense.html %}

In order to style the range input first you must remove the default browser styles, this is done with `appearance: none;` on `input[type=“range”]`, you may need to add browser prefixes for older/unsupported browsers.
```css
.rangeWrapper {
  position: relative;
  width: 80%;
  margin: auto;
}

.label {
  font-family: sans-serif;
  font-size: 1.5em;
  color: #388E3C;
  line-height: 2em;
}

input[type="range"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  width: 100%;
  height: 25px;
  padding: 3px;
  border-radius: 15px;
  background-color: #388E3C;
  transition: background-color 0.25s ease;
  outline: none;
}
```
This will make the component invisible but it's still there, now you just need to add your custom styles!
Start by giving it 100% width, some height and a background-color, I have also added border radius.
We also want to animate the range track depending on whether its focused or being hovered upon, using css transitions you can easily apply these styles, I have added `transition: background-color 0.25s ease;` this will animate the track color when it changes.

```css
input[type="range"]:hover {
  background-color: #4CAF50;
}

input[type="range"]:active {
  background-color: #81C784;
}
```
I have set the background color of the track to be lighter on hover and even lighter on active, I like this effect as it feels like the element is waking up as you hover and awake as you use it before going back to sleep again.

Now for the range 'thumb' this is the part that moves along the track, to style this you have to use some vender prefixes.
Going forward I will be using the `-webkit` prefix for examples but don't forget to add `-moz` & `-ms`, look at the jsbin example for the full code.
```css
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  -webkit-appearance: none;
  width: 25px;
  height: 25px;
  background-color: white;
  border-radius: 25px;
  cursor: move;
  transition: all 0.15s ease;
}
```
I've just Made a simple white circle for the thumb but you can do almost anything here even have a background image to add texture.
This does look a little boring though so to make it more interesting I've added some animations on `:hover` & `:active`.
```css
input[type="range"]::-webkit-slider-thumb:hover {
  height: 30px;
  width: 30px;
  box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.5);
  -webkit-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.5);
}

input[type="range"]::-webkit-slider-thumb:active {
  height: 35px;
  width: 35px;
  box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.5);
  -webkit-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.5);
}
```
I have animated the size of the thumb as well as increase the shadow, this gives the effect that it's rising to your finger/cursor when you interact with it.

Using whats shown here you can quickly theme and customise the range input so that it blends in with your website or apps UI without writing a single line of javascript!.
