var angular = require('angular');
var timeIndicatorDir = require('./timeIndicator.js');
var timePositioning = require('../factories/timePositioningFactory.js');

timeIndicator = timeIndicatorDir(timePositioning());

var mockElement = {
  top: 0,
  css: function (obj) {
    this.top = obj.top;
  },
  parent: function () {
    return{
      height: function () {
        return 24 * 60;
      }
    };
  }
};

describe('the time indicator', function (argument) {

  beforeEach(function() {
    mockElement.top = 0;
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('should update the elements top', function () {
    var firstTop = mockElement.top;
    timeIndicator.link({}, mockElement);
    var secondTop = mockElement.top;
    expect(firstTop).not.toEqual(secondTop);
  });

  it('should update the elements top every minute', function () {
    timeIndicator.link({}, mockElement);
    var firstTop = mockElement.top;
    jasmine.clock().tick(60005);
    expect(timeIndicator.top).not.toEqual(firstTop);
  });
});