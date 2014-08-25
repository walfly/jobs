module.exports = function ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attr) {
      var isTruncated = false;
      var update = function () {
        var parent = element.parent();
        var lineHeight = element.css('font-size').split('p')[0];
        if(element.height() > (parent.height() - Number(lineHeight))){
          parent.addClass('truncated');
          isTruncated = true;
        } else {
          parent.removeClass('truncated');
          isTruncated = false;
        }
      };
      var bindTruncationEvents = function () {
        var eventHeight = element.parent().height();
        element.on('mouseenter', function () {
          var parent = element.parent();
          parent.css({
            'height': 'auto',
            'z-index': 1000
          });
          parent.removeClass('truncated'); 
        });
        element.on('mouseleave', function () {
          var parent = element.parent();
          parent.height(eventHeight);
          parent.addClass('truncated');
        });
      };
      var unbindTruncationEvents = function () {
        element.unbind('mouseenter');
        element.unbind('mouseleave');
      };
      var timeUpdate = function () {
        // wait for dom repaint
        // kind of a hack
        setTimeout(function () {
          update();
          if(isTruncated){
            bindTruncationEvents();
          } else {
            unbindTruncationEvents();
          }
        }, 1);
      };
      scope.$watch('event.overlaps', timeUpdate);
    }
  };
};