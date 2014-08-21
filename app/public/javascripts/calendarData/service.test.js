var Service = require('./service.js');
var angular = require('angular');
var service = new Service();

describe('the calendar data service', function () {
  describe('week', function () {
    var week = service.getWeek();
    it('should initialize a 7 day week on load', function () {
      expect(week.length).toEqual(7);
    });
    it('should populate each day with the corresponding day of the current week', function () {
      for(var i = 0; i < week.length; i ++){
        expect(week[i].date.getDay()).toEqual(i);
      }
    });
    it('should set the isToday property of the current day to true', function () {
      for(var i = 0; i < week.length; i ++){
        if(i === service.getDayOfWeek()){
          expect(week[i].isToday).toEqual(true);
        } else {
          expect(week[i].isToday).toEqual(false);
        }
      }
    });
    it('should assign an events array to every day', function () {
      for(var i = 0; i < week.length; i ++){
        expect(angular.isArray(week[i].events)).toEqual(true);
      }
    });
  });
  describe('adding events', function () {
    beforeEach(function () {
      service.dumpAllEvents();
    });
    var week = service.getWeek();
    it('should push the event to the the day passed into the function', function () {
      var numEvents;
      for(var i = 0; i < week.length; i ++){
        numEvents = Math.floor(Math.random()*5);
        for(var j = 0; j < numEvents; j ++){
          service.addEvent({startTime: new Date ()}, i);
        }
        expect(week[i].events.length).toEqual(numEvents);
      }
    });
    it('should sort the events by start time', function () {
      var dateOne = new Date();
      var dateOneEnd = new Date(dateOne.getTime() + 100);
      var dateTwo = new Date(dateOne.getTime() - 50000);
      var dateTwoEnd = new Date(dateTwo.getTime() + 100);
      var dateThree = new Date(dateOne.getTime() + 50000);
      var dateThreeEnd = new Date(dateThree.getTime() + 500);
      service.addEvent({startTime: dateOne, endTime: dateOneEnd, title: 'dateOne'}, 2);
      service.addEvent({startTime: dateTwo, endTime: dateTwoEnd, title: 'dateTwo'}, 2);
      service.addEvent({startTime: dateThree, endTime: dateThreeEnd, title: 'dateThree'}, 2);
      expect(week[2].events[0].title).toEqual('dateTwo');
      expect(week[2].events[1].title).toEqual('dateOne');
      expect(week[2].events[2].title).toEqual('dateThree');
    });
    it('should calculate the overlaps for all events', function () {
      var dates = [];
      var curDate = new Date();
      var unit = 10000;
      var obj;
      for(var i = 0; i < 10; i ++){
        obj = {};
        obj 

      }
    });
  });
});