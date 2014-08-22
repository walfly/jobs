var angular = require('angular');

var monthDay = require('./monthDay.js');

angular.module('wfCalendar.filters', [])
  .filter('wfMonthDay', monthDay);
