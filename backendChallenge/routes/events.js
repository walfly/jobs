var async = require('async');


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
      }
    ],
  )
};

exports.transformRespons = function (googRes, callBack) {

};