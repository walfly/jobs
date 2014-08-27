var async = require('async');
var _ = require('lodash');

var gapi = require('../services/google.js');

// regular expression for extracting the frequency
var re1='.*?';  // Non-greedy match on filler
var re2='(FREQ)'; // Variable Name 1
var re3='(=)';  // Any Single Character 1
var re4='((?:[a-z][a-z]+))';  // Word 1
var rRuleRegex = new RegExp(re1+re2+re3+re4,["i"]);


exports.makeGoogRequest = function (req, res) {
  var accessToken = req.query.accessToken;
  if(!accessToken){
    res.status(400);
    res.send('no token');
    return;
  }
  var calendarId = req.params.calendarID;
  if(!calendarId){
    res.status(400);
    res.send('no calendarId');
    return;
  }
  async.waterfall(
    [
      function (callBack) {
        gapi.client.setCredentials({
          access_token: accessToken
        });
        gapi.cal.events.list({userId:'me', auth: gapi.client, calendarId: calendarId}, function (err, googRes) {
          if (err) {
            callBack(err);
          } else {
            callBack(null, googRes);
          }
        });
      },
      exports.transformResponse
    ],
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
};

exports.transformResponse = function (googRes, callBack) {
  callBack(null, _.map(googRes.items, function (event) {
    // always available
    var sunriseEvent = {
      id: event.id,
      status: event.status,
      title: event.summary,
      start: {
        dateTime: event.start.dateTime,
        timezone: event.start.timeZone
      },
      end: {
        dateTime: event.end.dateTime,
        timezone: event.end.timeZone
      },
      location: event.location,
      organizer : {
        name: event.organizer.displayName || event.organizer.email,
        emails: [
          event.organizer.email
        ],
        // bang bang because its undefined if false
        self: !!event.organizer.self
      },
      // you can edit events you are the organizer of
      // google docs are out of date and use locked instead of guests can edit
      editable: !!event.guestsCanModify || !!event.organizer.self
    };
    // if there is a recurrence use regex to select the rRule
    if (event.recurrence) {
      var rRule = rRuleRegex.exec(event.recurrence[0]);
      sunriseEvent.recurrence = '' + rRule[1] + rRule[2] + rRule[3];
    }

    sunriseEvent.attendees = _.map(event.attendees, function (attendee) {
      // don't know if im misreading the spec but it seems like organizer is not be included
      if (!attendee.organizer) {
        return {
          // if no display name using email seems right
          name: attendee.displayName || attendee.email,
          emails: [ attendee.email ],
          // bang bang cause undefined when false
          self: !!attendee.self,
          rsvpStatus: attendee.responseStatus
        };
      }
    });
    sunriseEvent.attendees = _.compact(sunriseEvent.attendees);
    return sunriseEvent;
  }));
};