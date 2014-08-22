module.exports = function (timePossitionFactory) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="time-indicator"></div>',
    link: function(scope, element, attr) {
      var date = new Date ();
    }
  };
};