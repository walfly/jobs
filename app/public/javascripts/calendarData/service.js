var angular = require('angular');

module.exports = function () {

  // building the calendar to only handle one week for conveninence
  var calendar = {};

  var currentDate = new Date();
  var dayOfWeek = currentDate.getDay();

  // populate the week with this weeks information
  calendar.week = new Array(7);
  angular.forEach(calendar.week, function (item, index) {
    var day = {};
    day.events = [];
    var offset = dayOfWeek - index;
    if (offset === 0) {
      day.isToday = true;
      day.date = currentDate;
    } else {
      day.isToday = false;
      day.date = new Date ();
      day.date.setDate(currentDate.getDate() - offset);
    }
    calendar.week[index] = day;
  });

  this.getWeek = function () {
    return calendar.week;
  };

  this.getDayOfWeek = function () {
    return dayOfWeek;
  };

};