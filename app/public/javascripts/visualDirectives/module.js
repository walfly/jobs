var angular = require('angular');

var thirtyMinBoxes = require('./thirtyMinBoxes.js');
var timeLabel = require('./timeLabel.js');
var scrollToHour = require('./scrollToHour.js');
var timeIndicator = require('./timeIndicator.js');
var truncate = require('./truncate.js');

angular.module('wfCalendar.visualDirectives', ['wfCalendar.calendarData'])
  .directive('wfThirtyMinBoxes', thirtyMinBoxes)
  .directive('wfTimeLabel', timeLabel)
  .directive('wfTruncate', truncate)
  .directive('wfScrollToHour', scrollToHour)
  .directive('wftimeindicator', ['wfTimePositioning', timeIndicator]);
