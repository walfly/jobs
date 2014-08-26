var abbrDay = require('./abbrDay.js');

var abbrDayFunc = abbrDay();

describe('abbreviated day of week filter', function () {
  it('should return a 3 letter abreviation of the day of the week', function () {
    var week = [
      new Date(2014, 7, 17),
      new Date(2014, 7, 18),
      new Date(2014, 7, 19),
      new Date(2014, 7, 20),
      new Date(2014, 7, 21),
      new Date(2014, 7, 22),
      new Date(2014, 7, 23)
    ];
    var abbr = [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat'
    ];
    for(var i = 0; i < week.length; i ++){
      expect(abbrDayFunc(week[i])).toEqual(abbr[i]);
    }
  });
});