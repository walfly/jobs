var angular = require('angular');

var weekDirective = require('./weekDirective.js');
var dayDirective = require('./dayDirective.js');
var eventDirective = require('./eventDirective.js');
var thirtyMinBoxes = require('./visualDirectives/thirtyMinBoxes.js');
var timeLabel = require('./visualDirectives/timeLabel.js');
var scrollToHour = require('./visualDirectives/scrollToHour.js');
var timeIndicator = require('./visualDirectives/timeIndicator.js');
var timePositioning = require('./factories/timePositioningFactory.js');

angular.module('wfCalendar.week', ['wfCalendar.calendarData'])
  .factory('wfTimePositioning', timePositioning)
  .directive('wfweek', weekDirective)
  .directive('wfday', dayDirective)
  .directive('wfThirtyMinBoxes', thirtyMinBoxes)
  .directive('wfTimeLabel', timeLabel)
  .directive('wfScrollToHour', scrollToHour)
  .directive('wftimeindicator', ['wfTimePositioning', timeIndicator])
  .directive('wfevent', ['wfTimePositioning', eventDirective]);
