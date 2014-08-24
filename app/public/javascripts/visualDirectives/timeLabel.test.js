var angular = require('angular');
var timeLabel = require('./timeLabel.js');

var object = timeLabel();

describe('creating timeLabels', function () {
  var element;
  beforeEach(function () {
    element = angular.element('<div></div>');
    object.compile(element);
  });
  it('should create 23 time labels', function () {
    expect(element.find('div').length).toEqual(24);
  });
  it('should distinguish between am and pm', function () {
    var text = element.children().eq(15).text();
    var ampm = text.split(' ')[1];
    expect(ampm).toEqual('pm');
    text = element.children().eq(2).text();
    ampm = text.split(' ')[1];
    expect(ampm).toEqual('am');
  });
});