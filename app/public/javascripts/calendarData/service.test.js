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
    it('should push the event to the the correct day', function () {
      var date = new Date(2014, 7, 22, 4);
      service.addEvent({startTime: date});
      expect(week[date.getDay()].events.length).toEqual(1);
    });
    it('should sort the events by start time', function () {
      var dateOne = new Date(2014, 7, 22, 4);
      var dateOneEnd = new Date(dateOne.getTime() + 100);
      var dateTwo = new Date(dateOne.getTime() - 50000);
      var dateTwoEnd = new Date(dateTwo.getTime() + 100);
      var dateThree = new Date(dateOne.getTime() + 50000);
      var dateThreeEnd = new Date(dateThree.getTime() + 500);
      service.addEvent({startTime: dateOne, endTime: dateOneEnd, title: 'dateOne'});
      service.addEvent({startTime: dateTwo, endTime: dateTwoEnd, title: 'dateTwo'});
      service.addEvent({startTime: dateThree, endTime: dateThreeEnd, title: 'dateThree'});
      expect(week[dateOne.getDay()].events[0].title).toEqual('dateTwo');
      expect(week[dateOne.getDay()].events[1].title).toEqual('dateOne');
      expect(week[dateOne.getDay()].events[2].title).toEqual('dateThree');
    });
    it('should calculate the overlaps for all events', function () {
      // creates this pattern of events
      // |
      // ||
      // |||
      // ||||
      //  ||||
      //   || |
      //    |  |
      //        |
      //         |
      //          |

      var dates = [];
      var curDate = new Date(2014, 7, 22, 4);
      var unit = 10000;
      var obj;
      for(var i = 0; i < 10; i ++){
        obj = {};
        obj.start = new Date(curDate.getTime() + (unit * i));
        obj.end = i < 4 ?
          new Date(obj.start.getTime() + (unit * 4)):
          new Date(obj.start.getTime() + unit);
      }
      angular.forEach(dates, function (date){
        service.addEvent({startTime: date.start, endTime: date.end}, 1);
      });
      angular.forEach(week[1].events, function (event, index) {
        if(index < 7){
          expect(event.overlaps).toEqual(6);
        } else {
          expect(event.overlaps).toEqual(0);
        }
      });
    });
  });
});