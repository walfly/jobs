var angular = require('angular');

require('./calendarData/module.js');
require('./week/module.js');
require('./filters/module.js');

angular.module('wfCalendar', ['wfCalendar.calendarData', 'wfCalendar.week', 'wfCalendar.filters']);