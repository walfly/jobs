module.exports = function ($http, $q, calendarData) {
  var week = calendarData.getWeek();
  var tweets = [];
  var numberOfRefreshes = 0;
  var requesting = false;

  var setTweets = function (res) {
    requesting = false;
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

      // choose a duration between 30 minutes and 6 hour or end of day
      var maxMin = 60 - startDate.getMinutes();
      var maxHour = 22 - startDate.getHours();
      var max = (maxHour * 60) + maxMin;
      max = (max > 5 * 60) ? 5 * 60 : max;
      var duration = (30 * 60 * 1000) + (Math.floor(Math.random() * max) * 60 * 1000);

      return {
        start: startDate,
        end: new Date(startDate.getTime() + duration)
      };
    },

    getTwitterText: function () {
      var defer = $q.defer();
      var promise = defer.promise;
      if (tweets.length) {
        defer.resolve(tweets.pop());
      } else if (!requesting) {
        requesting = true;
        promise = $http.get('/api/tweets', {params:{index: numberOfRefreshes}}).then(setTweets);
        numberOfRefreshes ++;
      } else {
        return;
      }
      return promise;
    }
  };
};