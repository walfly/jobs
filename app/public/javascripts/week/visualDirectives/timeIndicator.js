module.exports = function (timePositioning) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="time-indicator"></div>',
    link: function(scope, element, attr) {
      var updatePos = function () {
        var date = new Date ();
        element.css({
          top: timePositioning.timeToPosition(element.parent(), date),
        });
        setTimeout(updatePos, 60000);
      };
      updatePos();
    }
  };
};