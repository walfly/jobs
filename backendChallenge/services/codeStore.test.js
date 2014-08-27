var expect = require('chai').expect;
var codeStore = require('./codeStore.js');

describe('the code store', function () {
  it('should set a value with set and return it with get', function () {
    codeStore.setCode('hey');
    expect(codeStore.getCode()).to.equal('hey');
  });
});