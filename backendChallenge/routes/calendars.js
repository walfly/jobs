var async = require('async');
var _ = require('lodash');

var gapi = require('../services/google.js');

exports.makeGoogRequest = function (req, res) {
  var accessToken = req.query.accessToken;
  if(!accessToken){
    res.send('no token');
    return;
  }
  async.waterfall(
    [
      function (callBack) {
        gapi.client.setCredentials({
          access_token: accessToken, 
        });
        gapi.cal.calendarList.list({userId: 'me', auth: gapi.client}, function (err, googRes) {
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
  callBack(null, _.map(googRes.items, function (calendar) {
    return {
      id: calendar.id,
      title: calendar.summary, 
      color: calendar.backgroundColor,
      writeable: (calendar.accessRole === 'reader' || calendar.accessRole === 'freeBusyReader') ?
                  false : true,
      selected: calendar.selected,
      timezone: calendar.timeZone
    };
  }));
};
