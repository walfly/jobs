var Twit = require('twit');
var _ = require('underscore');
var twitter = new Twit ({
  "consumer_key": "epzVebAjChcbzeA3CHpIxq4aC",
  "consumer_secret": "Dr6hiVALssoB39qZY9AONsGugptbDf7ErmGCblwQibKw2jV7RA",
  "access_token": "401210692-YB3lcCugHlQqCDaI3fjr8g5fNfybykPagYy5lMS1",
  "access_token_secret": "A1F2zp4O9aAGpK6B6BZ57NpFn3YHfEpR0AmKOsZozWX5s"
});

module.exports = function (req, res) {
  twitter.get('search/tweets', {q:'#haiku', count: 100}, function (err, data, response) {
    res.send(_.pluck(data.statuses, 'text'));
  });
};