var timePositioningFactory = require('./timePositioningFactory.js');

var mockElement = {
  height: function () {
    return 24 * 60;
  }
};

var timePositioning = timePositioningFactory();

describe('timePositioningFactory', function () {
  describe('converting time to position', function () {
    it('should take a time and return the position within the week container', function () {
      var date = new Date(2014, 7, 22, 10, 25);
      expect(timePositioning.timeToPosition(mockElement, date)).toEqual(625);
    });
  });
  describe('startAndEnd', function () {
    it('should return at start and end spaced the correct number of minute blocks apart', function () {
      var date = new Date(2014, 7, 22, 10, 25);
      var dateTwo = new Date(2014, 7, 22, 10, 55);
      var obj = timePositioning.startAndEnd(mockElement, date, dateTwo);
      expect(obj.end - obj.start).toEqual(30);
    });
  });
});