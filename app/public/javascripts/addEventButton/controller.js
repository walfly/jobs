module.exports = function ($scope, calendarData) {
  $scope.addEvent = function () {
    var event = {
      startTime: new Date(2014, 7, 20, 10),
      endTime: new Date(2014, 7, 20, 12),
    }
    calendarData.addEvent(event);
  };
};