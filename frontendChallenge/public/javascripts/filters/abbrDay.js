module.exports = function () {
  return function (date) {
    return date.toDateString().split(' ')[0];
  };
};