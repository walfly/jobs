var angular = require('angular');

var monthDay = require('./monthDay.js');
var abbrDay = require('./abbrDay.js');

angular.module('wfCalendar.filters', [])
  .filter('wfMonthDay', monthDay)
  .filter('wfAbbrDay', abbrDay);
