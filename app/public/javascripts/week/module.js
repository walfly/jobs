var angular = require('angular');

var weekDirective = require('./weekDirective.js');
var dayDirective = require('./dayDirective.js');
var eventDirective = require('./eventDirective.js');

require('../factories/module.js');

angular.module('wfCalendar.week', ['wfCalendar.calendarData', 'wfCalendar.factories'])
  .directive('wfweek', weekDirective)
  .directive('wfday', dayDirective)
  .directive('wfevent', ['wfTimePositioning', eventDirective]);
