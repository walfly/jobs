var angular = require('angular');
var scrollToHour = require('./scrollToHour.js')();


describe('the scrollToHour directive', function () {
  var element = {
    '0':{
      scrollHeight: 2400
    },
    scrolltop: 0,
    scrollTop: function (dest){
      if(dest === undefined){
        return this.scrolltop;
      } else {
        this.scrolltop = dest;
      }
    }
  };
  var attr = {
    hour: '10'
  };
  it('should take an time in hour format and scroll the element by the ratio of the number to 24', function () {
    scrollToHour.link({}, element, attr);
    expect(element.scrollTop()).toEqual(1000);
  });
});