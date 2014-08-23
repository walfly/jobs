module.exports = function ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attr) {
      var update = function () {
        var parent = element.parent();
        var lineHeight = element.css('font-size').split('p')[0];
        if(element.height() > (parent.height() - Number(lineHeight))){
          parent.addClass('truncated');
        } else {
          parent.removeClass('truncated');
        }
      };
      var timeUpdate = function () {
        // wait for dom repaint
        // kind of a hack
        setTimeout(function () {
          update();
        }, 1);
      };
      scope.$watch('event.overlaps', timeUpdate);
    }
  };
};