var google = require('googleapis');
var oauth2Client = new google.auth.OAuth2('438724244633-5aajj82f7140ma4p239mej1lcecc6fe5.apps.googleusercontent.com', 'Ic7plc5CXtp00F7fV3e1ThN0', 'http://localhost:3000/authenticate/callback');
var calendar_auth_url = oauth2Client.generateAuthUrl({
  access_type: 'online',
  scope: 'https://www.googleapis.com/auth/calendar'
});

exports.cal = google.calendar('v3');
exports.oauth = google.auth.OAuth2;
exports.client = oauth2Client;
exports.url = calendar_auth_url;

