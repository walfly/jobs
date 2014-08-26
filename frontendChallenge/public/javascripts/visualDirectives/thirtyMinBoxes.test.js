var angular = require('angular');
var thirtyMinBoxes = require('./thirtyMinBoxes');

var object = thirtyMinBoxes();

describe('creating 30 minute boxes', function () {
  var element;
  beforeEach(function () {
    element = angular.element('<div></div>');
    object.compile(element);
  });
  it('should create 48 divs and append them to the element', function () {
    expect(element.find('div').length).toEqual(48);
  });
  it('should give the class time-block-even to even numbered divs and time-block-odd to odd numbered divs', function () {
    expect(element.children().eq(1).hasClass('time-block-even')).toBe(true);
    expect(element.children().eq(12).hasClass('time-block-odd')).toBe(true);
  });
});