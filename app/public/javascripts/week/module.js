var angular = require('angular');

var weekDirective = require('./weekDirective.js');
var dayDirective = require('./dayDirective.js');
var thirtyMinBoxes = require('./visualDirectives/thirtyMinBoxes.js');
var timeLabel = require('./visualDirectives/timeLabel.js');
var timeIndicator = require('./visualDirectives/timeIndicator.js');
var timePositioning = require('./factories/timePositioningFactory.js');

angular.module('wfCalendar.week', ['wfCalendar.calendarData'])
  .factory('wfTimePositioning', timePositioning)
  .directive('wfweek', weekDirective)
  .directive('wfday', dayDirective)
  .directive('wfThirtyMinBoxes', thirtyMinBoxes)
  .directive('wfTimeLabel', timeLabel)
  .directive('wfTimeIndicator', ['wfTimePositioning', timeIndicator]);
