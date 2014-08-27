var expect = require('chai').expect;
var sinon = require('sinon');
var calendars = require('./calendars.js');


describe('transformResponse', function () {
  var response;
  var callBack = function (err, res) {
    response = res;
  };

  beforeEach(function () {
    response = [];
  });
  it('should return an array with the same number of items as the response', function () {
    var googRes = {
      items: [
        {},
        {},
        {},
        {},
        {}
      ]
    };
    calendars.transformResponse(googRes, callBack);
    expect(response.length).to.equal(5);
  });
  it('should return an array where every object has 6 properties', function () {
    var googRes = {
      items: [
        {}
      ]
    };
    calendars.transformResponse(googRes, callBack);
    expect(Object.keys(response[0]).length).to.equal(6);
  });
  it('should set writeable to false if accessRole equals reader or freeBusyReader else true', function () {
    var googRes = {
      items: [
        {
          'accessRole': 'reader'
        }
      ]
    };
    calendars.transformResponse(googRes, callBack);
    expect(response[0].writeable).to.equal(false);
    googRes = {
      items: [
        {
          'accessRole': 'freeBusyReader'
        }
      ]
    };
    calendars.transformResponse(googRes, callBack);
    expect(response[0].writeable).to.equal(false);
    googRes = {
      items: [
        {
          'accessRole': 'writer'
        }
      ]
    };
    calendars.transformResponse(googRes, callBack);
    expect(response[0].writeable).to.equal(true);
    googRes = {
      items: [
        {
          'accessRole': 'owner'
        }
      ]
    };
    calendars.transformResponse(googRes, callBack);
    expect(response[0].writeable).to.equal(true);
  });
  it('should map coresponding poperties to each other', function () {
    var googRes = {
      items: [
        { kind: 'calendar#calendarListEntry',
        etag: '"1401852987788000"',
        id: 'flynnw99@gmail.com',
        summary: 'flynnw99@gmail.com',
        timeZone: 'America/New_York',
        colorId: '17',
        backgroundColor: '#9a9cff',
        foregroundColor: '#000000',
        selected: true,
        accessRole: 'owner',
        defaultReminders: [Object],
        notificationSettings: [Object],
        primary: true }
      ]
    };
    calendars.transformResponse(googRes, callBack);
    expect(response[0].id).to.equal(googRes.items[0].id);
    expect(response[0].title).to.equal(googRes.items[0].summary);
    expect(response[0].color).to.equal(googRes.items[0].backgroundColor);
    expect(response[0].selected).to.equal(googRes.items[0].selected);
    expect(response[0].timezone).to.equal(googRes.items[0].timeZone);
  });
});

describe('makeGoogRequest', function () {
  var req = {
    query: {}
  };
  var res = {
    send: sinon.spy()
  };
  it('should send no token if there is no acess token', function () {
    calendars.makeGoogRequest(req, res);
    expect(res.send.calledWith('no token')).to.equal(true);
  });
});
