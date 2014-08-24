var angular = require('angular');

var timePositioning = require('./timePositioningFactory');

angular.module('wfCalendar.factories', [])
  .factory('wfTimePositioning', timePositioning);

