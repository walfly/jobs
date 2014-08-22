module.exports = function ($scope, calendarData) {
  $scope.addEvent = function () {
    calendarData.addEvent(event);
  };
};