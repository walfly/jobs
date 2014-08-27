var expect = require('chai').expect;
var sinon = require('sinon');
var index = require('./index.js');
var codeStore = require('../services/codeStore.js');


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

describe('the checkIfHasCode', function () {
  var next, res;
  beforeEach(function () {
    next = sinon.spy();
    res = {
      redirect: sinon.spy()
    };
    codeStore.setCode(undefined);
  });
  it('should call next if the code is present', function () {
    codeStore.setCode('code');
    index.checkIfHasCode({}, res, next);
    expect(next.called).to.equal(true);
    expect(res.redirect.called).to.equal(false);
  });
  it('should redirect if the code is undefined', function () {
    index.checkIfHasCode({}, res, next);
    expect(next.called).to.equal(false);
    expect(res.redirect.called).to.equal(true);
  });
});
