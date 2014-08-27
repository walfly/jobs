var async = require('async');
var _ = require('lodash');

var gapi = require('../services/google.js');


exports.makeGoogRequest = function (req, res) {
  var accessToken = req.query.accessToken;
  if(!accessToken){
    res.send('no token');
    return;
  }
  var calendarId = req.params.calendarID;
  if(!calendarId){
    res.send('calendarId');
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
        })
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
  )
};

exports.transformResponse = function (googRes, callBack) {
  callBack(null, _.map(googRes.items, function (event) {
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
      location: event.location
    }
    console.log(event.organizer);
    if (event.organizer) {
      sunriseEvent.organizer = {
        name: event.organizer.displayName,
        emails: [
          event.organizer.email
        ],
        self: !!event.organizer.self
      };
    }
    console.log(event.recurrence);
    if (event.recurrence) {
      sunriseEvent.recurrence = event.recurrence[0];
    }
  }));
};