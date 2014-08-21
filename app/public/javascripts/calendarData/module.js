var angular = require('angular');

var service = require('./service.js');

angular.module('wfCalendar.calendarData', [])
  .service('wfCalendar.calendarData.service', service);
