var angular = require('angular');

var timePositioning = require('./timePositioningFactory');
var randomEvents = require('./randomEventFactory');

angular.module('wfCalendar.factories', [])
  .factory('wfTimePositioning', timePositioning)
  .factory('wfRandomEvents', ['$http', '$q', 'wfCalendarData', randomEvents]);

