var angular = require('angular');

var monthDay = require('./monthDay.js');
var abbrDay = require('./abbrDay.js');
var standardTimeFormat = require('./standardTimeFormat.js');

angular.module('wfCalendar.filters', [])
  .filter('wfMonthDay', monthDay)
  .filter('wfStandardTimeFormat', standardTimeFormat)
  .filter('wfAbbrDay', abbrDay);
