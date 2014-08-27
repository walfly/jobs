var expect = require('chai').expect;
var sinon = require('sinon');
var auth = require('./authenticate.js');
var codeStore =require('../services/codeStore.js');

describe('the authenticat redirect function', function () {
  var res = {};
  beforeEach(function () {
    res.url = '';
    res.redirect = function (url) {
      this.url = url;
    };
  });
  it('should call redirect with secure url', function () {
    auth.redirect({}, res);
    expect(res.url.split(':')[0]).to.equal('https');
  });
});

describe('the authentication callback', function () {
  var res = {};
  var req = {
    query: {
      code: 'aCode'
    }
  };
  beforeEach(function () {
    res.send = sinon.spy();
  });
  it('should save the auth token to the codeStore', function () {
    auth.callback(req, res);
    expect(codeStore.getCode()).to.equal('aCode');
  });
  it('shoud send the auth token in the response', function () {
    auth.callback(req, res);
    expect(res.send.calledWith('your code: aCode')).to.equal(true);
  });
});