module.exports = function () {
  return function (date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return '' + month + '/' + day;
  };
};