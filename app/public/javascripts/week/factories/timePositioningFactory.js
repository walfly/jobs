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
      var position = (time.getHours() * hourBlock) + (time.getMinutes() * minBlock);
      // making the assumption that week is always the direct parent of a day
      var week = element.parent();
      // return the actual position on the page
      return position - week.offset().top + week.scrollTop();
    },

    startAndEnd: function (element, start, end) {
      return {
        start: this.timeToPosition(element, start),
        end: this.timeToPosition(element, end)
      };
    }

  };
};