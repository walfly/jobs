module.exports = function ($scope, calendarData) {
  $scope.addEvent = function () {
    var obj = {
      startTime: new Date(2014, 7, 20, 10),
      endTime: new Date(2014, 7, 20, 12),
      title: 'a date title you know some more text let make it longer and longer'
    };
    calendarData.addEvent(obj);
  };
};