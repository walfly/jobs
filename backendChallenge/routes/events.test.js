var expect = require('chai').expect;
var sinon = require('sinon');
var _ = require('lodash');
var events = require('./events.js');

describe('events.transformResponse', function () {
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
        {
          start: {},
          end: {},
          organizer: {},
        },
        {
          start: {},
          end: {},
          organizer: {},
        },
        {
          start: {},
          end: {},
          organizer: {},
        },
        {
          start: {},
          end: {},
          organizer: {},
        },
        {
          start: {},
          end: {},
          organizer: {},
        }
      ]
    };
    events.transformResponse(googRes, callBack);
    expect(response.length).to.equal(5);
  });

  it('should return false for organizer self if undefined', function () {
    var googRes = {
      items: [
        {
          start: {},
          end: {},
          organizer: {},
        }
      ]
    };
    events.transformResponse(googRes, callBack);
    expect(response[0].organizer.self).to.equal(false);
  });

  it('should return emails as an array', function () {
    var googRes = {
      items: [
        {
          start: {},
          end: {},
          organizer: {
            email: 'a@b.c'
          },
        }
      ]
    };
    events.transformResponse(googRes, callBack);
    expect(response[0].organizer.emails).to.be.an('array');
  });

  it('should set editable based on if is oragnizer or guests can edit property', function () {
    var googRes = {
      items: [
        {
          start: {},
          end: {},
          organizer: {
            self: true
          },
        }
      ]
    };
    events.transformResponse(googRes, callBack);
    expect(response[0].editable).to.equal(true);
    googRes = {
      items: [
        {
          start: {},
          end: {},
          organizer: {},
          guestsCanModify: true
        }
      ]
    };
    events.transformResponse(googRes, callBack);
    expect(response[0].editable).to.equal(true);
    googRes = {
      items: [
        {
          start: {},
          end: {},
          organizer: {}
        }
      ]
    };
    events.transformResponse(googRes, callBack);
    expect(response[0].editable).to.equal(false);
  });

  it('should return just the rRule of the reccurrence property', function () {
    var googRes = {
      items: [
        {
          start: {},
          end: {},
          organizer: {}
        }
      ]
    };
    var possibleRecurrences = [
      {
        array: ['RRULE:FREQ=WEEKLY;BYDAY=SA'],
        expect: 'FREQ=WEEKLY'
      },
      {
        array: ['RRULE:FREQ=YEARLY;BYMONTH=1;BYMONTHDAY=19'],
        expect: 'FREQ=YEARLY'
      }
    ];
    for(var i = 0; i < possibleRecurrences.length; i ++){
      googRes.items[0].recurrence = possibleRecurrences[i].array;
      events.transformResponse(googRes, callBack);
      expect(response[0].recurrence).to.equal(possibleRecurrences[i].expect);
    }
  });
  it('should not include the organizer as an attendee', function () {
    var googRes = {
      items: [
        {
          start: {},
          end: {},
          organizer: {},
          attendees: [
            {organizer:true},
            {},
            {}
          ]
        }
      ]
    };
    events.transformResponse(googRes, callBack);
    expect(response[0].attendees.length).to.equal(2);
  });
  it('should always include a self property', function () {
    var googRes = {
      items: [
        {
          start: {},
          end: {},
          organizer: {},
          attendees: [
            {
              self: true
            },
            {},
            {},
          ]
        }
      ]
    };
    events.transformResponse(googRes, callBack);
    for (var i = 0; i < response[0].attendees.length; i ++) {
      if (i === 0) {
        expect(response[0].attendees[i].self).to.equal(true);
      } else {
        expect(response[0].attendees[i].self).to.equal(false);
      }
    }
  });
  it('should substitute email for display name if there is none for attendees', function () {
    var googRes = {
      items: [
        {
          start: {},
          end: {},
          organizer: {},
          attendees: [
            {
              displayName: 'Walker'
            },
            {
              email: 'a@b.c'
            }
          ]
        }
      ]
    };
    events.transformResponse(googRes, callBack);
    expect(response[0].attendees[0].name).to.equal('Walker');
    expect(response[0].attendees[1].name).to.equal('a@b.c');
  });
});


describe('events.makeGoogRequest', function () {
  var req = {
    query: {},
    params: {}
  };
  var res = {
    send: sinon.spy(),
    status: sinon.spy()
  };
  it('should send no token if there is no acess token', function () {
    events.makeGoogRequest(req, res);
    expect(res.send.calledWith('no token')).to.equal(true);
    expect(res.status.calledWith(400)).to.equal(true);
  });
  it('should send no calendar id if there is no calendarId', function () {
    req.query.accessToken = 'atoken';
    events.makeGoogRequest(req, res);
    expect(res.send.calledWith('no calendarId')).to.equal(true);
    expect(res.status.calledWith(400)).to.equal(true);
  });
});

