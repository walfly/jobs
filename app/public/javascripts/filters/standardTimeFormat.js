module.exports = function () {
  return function (time) {
    var min = time.getMinutes();
    var minStr = '' + min;
    minStr = minStr.length < 2 ? '0' + minStr: minsSr;
    var hour = time.getHours() % 12;
    if (hour === 0){
      hour = 12;
    }
    return '' + hour + ':' + minStr;
  };
};