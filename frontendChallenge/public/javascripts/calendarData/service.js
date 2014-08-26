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

  this.addEvent = function (event) {
    var day = event.startTime.getDay();
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
    // build a list of overlaps, events are already chronological
    var overLapList = [];
    var assign = function (item, index) {
      item.overlapPos = index;
      item.overlaps = overLapList.length - 1;
    };
    // preload the starting point 
    overLapList.push(calDay.events[0]);
    for(var i = 0; i < calDay.events.length; i ++){ 
      // events need to be able to find themselves in the list for editing 
      calDay.events[i].index = i;
      // if the next one overlaps add it
      if(calDay.events[i+1] && calDay.events[i].endTime > calDay.events[i+1].startTime){
        overLapList.push(calDay.events[i+1]);
      } else {
      // first none overlap count the list and assign the overlaps to each
        angular.forEach(overLapList, assign);
        // empty the list
        overLapList.length = 0;
        // start it on the next event
        if(calDay.events[i+1]){
          overLapList.push(calDay.events[i+1]);
        }
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