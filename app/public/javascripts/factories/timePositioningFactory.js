module.exports = function () {

  return {

    timeToPosition: function (element, time) {
      // get the total height of a day
      var height = element.height();
      // hour height
      var hourBlock = height/24;
      // min height, seconds won't make a visual difference 
      var minBlock = hourBlock/60;
      // position = hours times hourblock size + minutes * minblock size
      return (time.getHours() * hourBlock) + (time.getMinutes() * minBlock);
    },

    startAndEnd: function (element, start, end) {
      return {
        start: this.timeToPosition(element, start),
        end: this.timeToPosition(element, end)
      };
    }

  };
};