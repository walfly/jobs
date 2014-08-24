module.exports = function ($scope, calendarData, randomEvents) {
  $scope.addEvent = function () {
    var randomTimes = randomEvents.getRandomEventDates();
    console.log(randomTimes);
    randomEvents.getTwitterText()
      .then(function (haiku) {
        var obj = {
          startTime: randomTimes.start,
          endTime: randomTimes.end,
          title: haiku
        };
        calendarData.addEvent(obj); 
      });
  };
};