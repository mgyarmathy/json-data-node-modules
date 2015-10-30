'use strict';

var angular = require('angular');
var employeeData = require('mycompany-employee-data');

angular.module('employeeInfo', [])

.controller('MainCtrl', function() {
    var vm = this;
    vm.employees = employeeData;
});