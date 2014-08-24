var angular = require('angular');

require('../calendarData/module.js');
require('../addEventButton/module.js');

var controller = require('./controller.js');

angular.module('wfCalendar.addEventButton', ['wfCalendar.calendarData', 'wfCalendar.factories'])
  .controller('wfCalendar.addEventButton.controller', [
    '$scope',
    'wfCalendarData',
    'wfRandomEvents',
     controller
  ]);
