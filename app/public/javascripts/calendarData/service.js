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

  this.addEvent = function (event, day) {
    calendar.week[day].events.push(event);
    // maintain events in order of startTime 
    calendar.week[day].events.sort(function (a, b) {
      return a.startTime.getTime() - b.startTime.getTime();
    });
    // run through event list and assign days overlaps
    if(calendar.week[day].events.length > 1){
      this.assignOverlaps(day, event);
    } else {
      event.overlaps = 0;
    }
  };

  this.assignOverlaps = function (day) {
    var calDay = calendar.week[day];
    // find the new entry
    var i = 0;
    var j = 0;
    var possition;
    while(possition === undefined){
      if(calDay.events[i].overlaps === undefined){
        possition = i;
      }
      i ++;
    }
    // move out from the new entry til no longer overlaps
    var overLapping = {
      before: true,
      after: true
    };
    // initialize the number of overlaps to 0
    calDay.events[possition].overlaps = 0;
    // initialize i and j to be either side of the new entry
    i = possition + 1;
    j = possition - 1;

    while(overLapping.before || overLapping.after){
      if(i < calDay.events.length){
        // if it overlaps with later times
        if(calDay.events[i].startTime <= calDay.events[possition].endTime){
          calDay.events[i].overlaps ++;
          calDay.events[possition] ++;
        } else {
          overLapping.after = false;
        }
        i ++;
      } else {
        // stop the loop if it overalps all the way to the end
        overLapping.after = false;
      }
      if(j >= 0){
        // if it overlaps with earlier times
        if(calDay.events[j].endTime >= calDay.events[possition].startTime){
          calDay.events[j].overlaps ++;
          calDay.events[possition] ++;
        } else {
          overLapping.after = false; 
        }
        j --;
      } else {
        // stop the loop if it overalps all the way to the beginning
        overLapping.before = false;
      }
    }

  };

  this.dumpAllEvents = function () {
    angular.forEach(calendar.week, function (item, index) {
      this.dumpDayEvents(index);
    }, this);
  };

  this.dumpDayEvents = function (day) {
    calendar.week[day].events.length = 0;
  };

  this.removeEvent = function (day, event) {

  };

};