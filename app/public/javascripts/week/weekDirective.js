module.exports = function () {
  return {
    restrict: 'E',
    scope: {},
    replace: true,
    templateUrl: '/angularTemplates/weekTemplate.html',
    controller: [
      '$scope',
      'wfCalendar.calendarData.service',
      function (scope, calendarData) {
        scope.week = calendarData.getWeek();
      }
    ]
  };
};