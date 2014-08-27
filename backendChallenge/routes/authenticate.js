var goog = require('../services/google.js');
var oauth2Client = goog.client;
var url = goog.url;


exports.redirect = function (req, res) {
  res.redirect(url);
};


exports.callback = function (req, res) {
  oauth2Client.getToken(req.query.code, function(err, tokens) {
    if(!err){
      res.send('your token: ' + tokens.access_token);
    } else {
      res.send('invalid token');
    }
  });
};