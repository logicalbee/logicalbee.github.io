---
layout: post
title:  "Higher Order Functions"
image: https://i.imgur.com/qHXdMhE.jpg
date:   2018-05-10 20:20:00 +0000
author: Dale
intro: A post that tries to help demystify how higher order functions work by looking at ones you probably already use.
categories: js es6
---

When you first see higher order functions and how they were written it can feel a little intimidating especially if you're not fully acclimated to es6 syntax. Reading that they're "functions that return functions", "functions that modify other functions", "functions that accept functions as arguments" seeing code like `isLessThan = x => y => y < x;` or `isLessThan(a)(b)`.

What some people don't realise is that they're probably already using higher order functions, the Array primitive has some higher order methods like [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) and [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) which are commonly used to manipulate lists in front end frameworks.

If you have used some of these you may have even combined them like this trivial example that returns a list of female user emails
```javascript
const femEmailList = myUsers.filter(usr => user.gender === 'female')
  .map(femUsr => femUsr.email);
```
This is known as function composition where the result of one function becomes the input of the next and so on, this is a core concept in functional programming and allows you to compose smaller functions into bigger ones.

Let's go one step further, I often find the easiest way to learn how something works is to take it apart and analyse it piece by piece, so lets rebuild these methods and replicate how they work.


### map
This method is a pure function that iterates through an array and returns a new array, it takes a function for the first argument which it calls with each item in the array and returns a new array with the functions results, confusing? take a look at the example below.

You may have a list of user objects that you need to get email addresses from, lets get an array of user emails with map:
```javascript
const emailList = myUsers.map(user => user.email);
```

map is part of the array prototype which means any array will have this method available to it but lets recreate the functionality of map in a custom function called "iDesignMap".

```javascript
const iDesignMap = arrayToMap => funcToRun => {
  let newArray = [];
  for (let i = 0; arrayToMap.length > i; i++) {
    newArray.push(funcToRun(arrayToMap[i], i, arrayToMap));
  }
  return newArray;
};

const emailList = iDesignMap(myUsers)(user => user.email);
```

This may look complicated at first but just concentrate at the bottom where "iDesignMap" is called.
In functional programming languages functions are values, we assign the function "iDesignMap" to the constant "emailList". "iDesignMap" takes an array "myUsers" and returns a function (itself) that takes another function `user => user.email` as an argument which is uses internally to return a new array.

"iDesignMap" iterates over the array "arrayToMap" and calls "funcToRun" with each value, index and the original array. The returned result gets pushed into a new array which gets returned at the end.

Another common use case is where you take an array of data and map to DOM elements, for example you may want to display a list of comments in React for example it would look like this.

```javascript
render() {
  const { comments } = this.props;
  return (
    <ul>
      {comments.map(comment => (
        <li>{comment.body}</li>
      )}
    </ul>
  );
}
```

{% include article-adsense.html %}

### filter

Filter although similar to map is critically different as it returns a new filtered version of the original array rather than transforming each value.
```javascript
const maleUsers = myUsers.filter(user => user.gender === 'male');
```
The function argument must return a boolean, if it returns true for that array item it will be returned in the new array.

Lets recreate filter as a custom function.

```javascript
const iDesignFilter = arrayToMap => funcToRun => {
  let newArray = [];
  for (let i = 0; arrayToMap.length > i; i++) {
    if (funcToRun(arrayToMap[i], i, arrayToMap)) {
      newArray.push(arrayToMap[i]);
    }
  }
  return newArray;
};

const isMale = user => user.gender === 'male';
const maleUsers = iDesignFilter(myUsers)(isMale);
```

"iDesignFilter" takes an array "arrayToMap" and returns a function that takes another function "funcToRun" as an argument, when "iDesignFilter" iterates over "arrayToMap" it calls "funcToRun" with each value, index and the original array then finally returns a new filtered array.


### It still doesn't look right...

The main difference between these custom functions and the native counterparts is that the custom functions are not part of the array prototype and therefore must be passed the array, however you can add them to the prototype and use "this" in place of "arrayToMap".

```javascript
Array.prototype.iDesignFilter = function(funcToRun) {
  let newArray = [];
  for (let i = 0; this.length > i; i++) {
    if (funcToRun(this[i], i, this)) {
      newArray.push(this[i]);
    }
  }
  return newArray;
  }

  var maleUsers = myUsers.iDesignFilter(user => user.gender === 'male');
```

After you add this method to the prototype it will be available to all Array types just like "map" and "filter".
Of course this example is trivial because the methods already exist but now you can understand how higher order functions work, where they are used and how they are integrated into the language already.
