var monthDay = require('./monthDay.js');
var monthDayFunc = monthDay();

describe('monthDay filter', function () {
  it('should return the date in the format month/day', function () {
    var date = new Date(2013,11,1);
    var str = monthDayFunc(date);
    expect(str).toEqual('12/1');
  });
});