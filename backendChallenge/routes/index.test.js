var expect = require('chai').expect;
var sinon = require('sinon');
var index = require('./index.js');


describe('the redirect function', function () {
  var res;
  beforeEach(function () {
    res = {
      redirect: sinon.spy()
    };
  });
  it('should call redirect with the /authenticate route', function () {
    index.redirect({}, res); 
    expect(res.redirect.calledWith('/authenticate')).to.equal(true);
  });
});
