var randomEvents = require('./randomEventFactory.js');
var CalendarData = require('../calendarData/service.js');
var _ = require('underscore');
var angular = require('angular');

var calendarData = new CalendarData();

describe('the random event factory', function () {
  describe('getRandomEvent', function() {
    var random = randomEvents({}, {}, calendarData);
    it('should return a start and end date', function () {
      var dates = random.getRandomEventDates();
      expect(dates.start).toBeDefined();
      expect(dates.end).toBeDefined();
    });
  });
  describe('getTwitterText', function () {
    var http = {
      callCount: 0,
      get: function () {
        this.callCount ++;
        return {
          then: function (func) {
            func({data: new Array(20)});
          }
        };
      }
    };
    var q = {
      defer: function () {
        return {
          promise: {
            result: undefined
          },
          resolve: function (data) {
            this.promise.result = data;
          }
        };
      }
    };
    beforeEach(function () {
      http.callCount = 0;
    });
    it('should only call the http route when it runs out of tweets', function () {
      var random = randomEvents(http, q, calendarData);
      for(var i = 0; i < 22; i ++){
        random.getTwitterText();
      }
      expect(http.callCount).toEqual(2);
    });

  });
});