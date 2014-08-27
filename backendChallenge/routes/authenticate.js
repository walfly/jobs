var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var scope = 'https://www.googleapis.com/auth/calendar';

var oauth2Client = new OAuth2('387863401855-jbmvdcs5m5js33csq2oik8l2fna7jdn6.apps.googleusercontent.com', '92Vj8r8AZjWposaWd4ei7-jo', 'http://localhost:3000/authenticate/callback');


exports.redirect = function (req, res) {
  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scope
  });
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