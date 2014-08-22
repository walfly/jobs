module.exports = function () {
  return {
    restrict: 'E',
    scope: {},
    controller: [
      '$scope',
      'wfCalendar.calendarData.service',
      function (scope, calendarData) {
        scope.week = calendarData.getWeek();
      }
    ]
  };
};