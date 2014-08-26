var filter = require('./standardTimeFormat.js');
var standardTimeFormat = filter();

describe('the time format filter', function () {
  it('should take a time and return it in h:mm form', function () {
    var time = new Date(2014, 8, 22, 8, 25);
    expect(standardTimeFormat(time)).toEqual('8:25am');
  });
  it('should convert times into 12 hour format', function () {
    var time = new Date(2014, 8, 22, 20, 25);
    expect(standardTimeFormat(time)).toEqual('8:25pm');
  });
  it('should assign am or pm', function () {
    var timeOne = new Date(2014, 8, 22, 8, 25);
    var timeTwo = new Date(2014, 8, 22, 20, 25);
    expect(standardTimeFormat(timeOne)).toEqual('8:25am');
    expect(standardTimeFormat(timeTwo)).toEqual('8:25pm');
  });
});