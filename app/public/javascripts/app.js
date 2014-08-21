var angular = require('angular');

require('./calendarData/module.js');

angular.module('wfCalendar', ['wfCalendar.calendarData']);