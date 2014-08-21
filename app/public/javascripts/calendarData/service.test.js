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
});