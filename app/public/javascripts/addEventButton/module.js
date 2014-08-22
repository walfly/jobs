var angular = require('angular');

require('../calendarData/module.js');

var controller = require('./controller.js');

angular.module('wfCalendar.addEventButton', ['wfCalendar.calendarData'])
  .controller('wfCalendar.addEventButton.controller', [
    '$scope',
    'wfCalendar.calendarData.service',
     controller]);
