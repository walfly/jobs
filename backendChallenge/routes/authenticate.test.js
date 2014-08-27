var expect = require('chai').expect;
var sinon = require('sinon');
var auth = require('./authenticate.js');

describe('the authenticate redirect function', function () {
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

