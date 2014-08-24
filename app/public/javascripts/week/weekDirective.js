module.exports = function () {
  return {
    restrict: 'E',
    scope: {},
    replace: true,
    templateUrl: '/angularTemplates/weekTemplate.html',
    controller: [
      '$scope',
      'wfCalendarData',
      function (scope, calendarData) {
        scope.week = calendarData.getWeek();
      }
    ]
  };
};