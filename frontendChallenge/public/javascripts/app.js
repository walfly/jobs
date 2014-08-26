var angular = require('angular');

require('./calendarData/module.js');
require('./week/module.js');
require('./filters/module.js');
require('./addEventButton/module.js');
require('./factories/module.js');
require('./visualDirectives/module.js');

angular.module('wfCalendar', [
  'wfCalendar.calendarData',
  'wfCalendar.week',
  'wfCalendar.filters',
  'wfCalendar.addEventButton',
  'wfCalendar.visualDirectives',
  'wfCalendar.factories'
]);