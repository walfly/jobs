var angular = require('angular');

var weekDirective = require('./weekDirective.js');
var dayDirective = require('./dayDirective.js');
var thirtyMinBoxes = require('./visualDirectives/thirtyMinBoxes.js');
var timeLabel = require('./visualDirectives/timeLabel.js');

angular.module('wfCalendar.week', ['wfCalendar.calendarData'])
  .directive('wfweek', weekDirective)
  .directive('wfday', dayDirective)
  .directive('wfThirtyMinBoxes', thirtyMinBoxes)
  .directive('wfTimeLabel', timeLabel);
