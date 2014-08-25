var Twit = require('twit');
var _ = require('underscore');
var twitter = new Twit ({
  "consumer_key": "epzVebAjChcbzeA3CHpIxq4aC",
  "consumer_secret": "Dr6hiVALssoB39qZY9AONsGugptbDf7ErmGCblwQibKw2jV7RA",
  "access_token": "401210692-YB3lcCugHlQqCDaI3fjr8g5fNfybykPagYy5lMS1",
  "access_token_secret": "A1F2zp4O9aAGpK6B6BZ57NpFn3YHfEpR0AmKOsZozWX5s"
});

var placesToSearch = [
  {
    q: 'union square',
    geocode: [40.73586, -73.99108, '3mi']
  },
  {
    q: 'fort greene',
    geocode: [40.69206  -73.97419, '3mi']
  },
  {
    q: 'venice beach',
    geocode: [33.99362  -118.47991, '4mi']
  }
]

module.exports = function (req, res) {
  var placeToSearch = placesToSearch[req.query.index%3];
  twitter.get('search/tweets', {
    q:placeToSearch.q,
    count: 100,
    lang:'en',
    geocode: placeToSearch.geocode,
  }, function (err, data, response) {
    res.send(_.pluck(data.statuses, 'text'));
  });
};