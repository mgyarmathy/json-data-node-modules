---
tags: Javascript, NodeJS, NPM, JSON, Node Modules, Browserify
---

<!-- Part 1 -->
#Using JSON Data Node Modules and NPM to Store and Distribute Static Data

<img style="display: block; margin: 0 auto;" src="http://i.imgur.com/DtHsMG5.png"/>

NodeJS modules, along with Node Package Manager (NPM), are a great way for Javascript developers to share modularized bits of code. By publishing your module to NPM, anyone can include it in their NodeJS application with a simple `npm install your-package-name`. NodeJS developers have also used local node modules to store configuration data used throughout their application. In this way, config data can be accessed by `var config = require('path/to/config.json')`.

But there's also a third, less-common usage: node modules can also be used for storing and distributing static data. I refer to these types of node modules as JSON Data Node Modules. These modules are particularly useful when your application requires information that is public, static, and domain-specific. NPM can be leveraged to host and distribute static data. In addition, these modules are a great alternative to using a database to store and access your information.

For example, say that you have a set of employee information that is shared among several different internal applications. This data is relatively static, only updated occasionally as employees join or leave the company.

```json
// employee-data.json
[
  {
    "id": 101, 
    "img": "https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg",
    "name": "Sam Crawford",
    "department": "Marketing"
  },
  {
    "id": 102,
    "img": "https://s3.amazonaws.com/uifaces/faces/twitter/uxceo/128.jpg",
    "name": "Jane Reed",
    "department": "HR"
  },
  ...
]
```
> Note: Employee data is fictional and has been provided by [uiFaces](http://uifaces.com) and [uiNames](http://uinames.com).

The data above can be wrapped in a node module with just a single line of code:


```javascript
// company-employee-data.js
module.exports = require('path/to/employee-data.json');
```

Publish your module to NPM using a descriptive name to make it available to other NodeJS developers. In the case that you need to update the information stored in your module, be sure to update its version number so that anyone who uses it can pull the updated information with `npm update`. For more information on how to create and publish a node module to NPM, see the official documentation at [docs.npmjs.com](https://docs.npmjs.com/).

If you'd like to learn more about using JSON Data Node Modules on the front-end, read my follow-up to this post: [Consuming JSON Data Node Modules in the Browser with Browserify](http://www.credera.com/link-to-article).

---

<!-- Part 2 -->
#Consuming JSON Data Node Modules in the Browser with Browserify

*This post is a follow-up to the previous post: [Using NodeJS JSON Data Modules and NPM to Store and Distribute Static Data](http://www.credera.com/link-to-article).*

In my previous post, I talked about how to create JSON Data Node Modules. This post is a tutorial explaining how to use Browserify to utilize this type of node module in front-end applications.


<img style="display: block; margin: 0 auto;" src="http://substack.net/images/browserify_logo.png">

[Browserify](http://browserify.org/) is a tool that enables you to `require()` node modules in the browser, similar to NodeJS. It works by concatenating your modules, along with their dependendies, into a single bundle. This also gives your application a performance improvement by reducing the number of HTTP requests to the server to load your scripts.

In our example application, assume that we've already initialized our application's `package.json` file with `npm init` and are ready to incorporate our employee data module. We're also going to use AngularJS to handle presenting this information on the front-end. Run the following commands to download and add these two node modules to our application:

```
npm install mycompany-employee-data --save
npm install angular --save
```

We will use the Javascript code below to load our employee data module and include it in the Angular `$scope` object of our application's data model.

```javascript
// js/main.js
'use strict';

var angular = require('angular');
var employeeData = require('mycompany-employee-data');

angular.module('employeeInfo', [])

.controller('MainCtrl', function($scope) {
    $scope.employees = employeeData;
});
```

We `require()` our employee data module just like any other node module. All of the JSON data included in this module is now assigned to our `employeeData` variable. We then add it to the scope of our Angular `MainCtrl` with `$scope.employees = employeeData` <small>(line 10)</small>.

Next, run the following command to have Browserify bundle our script along with the node modules we have required:

```
browserify js/main.js > js/bundle.js
```
>Note: if you have not installed Browserify, install it globally for command-line use with `npm install -g browserify`.

For the last step, we are going to use the HTML template below to display our employee data. (This example uses [Materialize.css](http://materializecss.com/) for all of our CSS styling). It is essential to include the Browserify-generated `js/bundle.js` <small>(line 7)</small> rather than `js/main.js` for this to work.

```html
<!-- index.html -->

<!DOCTYPE html>
<html ng-app="employeeInfo">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MyCompany -- Our Employees</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.0/css/materialize.min.css">
    <script type="text/javascript" src="js/bundle.js" ></script>
</head>
<body ng-controller="MainCtrl">
  <div class="container">
    <h1>Our Employees</h1>
    <div class="row">
      <div ng-repeat="employee in employees" class="col s3">
        <div class="card">
          <div class="card-image">
            <img ng-src="{{employee.img}}">
          </div>
          <div class="card-content">
            <p><strong>{{employee.name}}</strong></p>
            <p>{{employee.department}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

View index.html in your browser of choice to see our finished result:

![](screenshot.png)
> Note: Employee data is fictional and has been provided by [uiFaces](http://uifaces.com) and [uiNames](http://uinames.com).

In this tutorial, we learned how to use Browserify to bundle JSON Data Node Modules in with our application's scripts. By wrapping static, domain-specific data into node modules, we can easily store and distribute this data through NPM, rather than using a database. Have you used JSON Data Node Modules in your projects? Share your experiences in the comments below.

