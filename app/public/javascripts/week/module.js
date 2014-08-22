var angular = require('angular');

var weekDirectve = require('./weekDirective.js');
var thirtyMinBoxes = require('./thirtyMinBoxes.js');

angular.module('wfCalendar.week', ['wfCalendar.calendarData'])
  .directive('wfWeek', weekDirective)
  .directive('wfThirtyMinBoxes', thirtyMinBoxes);
