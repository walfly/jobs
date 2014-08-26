module.exports = function () {
  return function (time) {
    var min = time.getMinutes();
    var minStr = '' + min;
    minStr = minStr.length < 2 ? '0' + minStr: minStr;
    var hour = time.getHours();
    var amPm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12;
    if (hour === 0){
      hour = 12;
    }
    return '' + hour + ':' + minStr + amPm;
  };
};