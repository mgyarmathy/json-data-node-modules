'use strict';

var angular = require('angular');
var employeeData = require('employee-data');

angular.module('employeeInfo', [])

.controller('MainCtrl', function($scope) {
    $scope.employees = employeeData;
});