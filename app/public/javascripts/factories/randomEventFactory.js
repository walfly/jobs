module.exports = function ($http, $q, calendarData) {
  var week = calendarData.getWeek();
  var tweets;

  var setTweets = function (res) {
    tweets = res.data;
    return tweets.pop();
  };

  return {
    getRandomEventDates: function () {
      // choose a random date from the week
      var dayOfWeek = Math.floor(Math.random() * 7);
      var startDate = new Date(week[dayOfWeek].date);

      // choose a random start hour
      startDate.setHours(Math.floor(Math.random() * 24));

      // choose a random start minute
      startDate.setMinutes(Math.floor(Math.random() * 60));

      // choose a duration between 15 minutes and 5 hours 15 minutes
      var duration = (15 * 60 * 1000) + (Math.floor(Math.random() * 6) * 60 * 60 * 1000);

      return {
        start: startDate,
        end: new Date(startDate.getTime() + duration)
      };
    },

    getTwitterText: function () {
      var defer = $q.defer();
      var promise = defer.promise;
      if (tweets) {
        defer.resolve(tweets.pop());
      } else {
        promise = $http.get('/api/tweets').then(setTweets);
      }
      return promise;
    }
  };
};