module.exports = function ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attr) {
      var isTruncated = false;
      var text;
      var newText;
      var update = function () {
        var parent = element.parent();
        var fontSize = Number(element.css('font-size').split('p')[0]);
        var heightDifference = element.height() - (parent.height() - fontSize);
        if (heightDifference > 0) {
          console.log('tuncating');
          parent.addClass('truncated');
          // calculate how much to trim
          var approxLines = element.height()/fontSize;
          var overLapLines = heightDifference/fontSize;
          var truncatePercent = overLapLines/approxLines;
          newText = text.slice(0, text.length - Math.floor(text.length * truncatePercent));
          element.text(newText + '...');
          // set the truncated flag
          isTruncated = true;
        } else {
          parent.removeClass('truncated');
          // set the text back if changed
          element.text(text);
          isTruncated = false;
        }
      };
      var bindTruncationEvents = function () {
        var parent = element.parent();
        var eventHeight = parent.height();
        parent.on('mouseenter', function () {
          parent.css('height', 'auto');
          element.text(text);
          parent.removeClass('truncated'); 
        });
        parent.on('mouseleave', function () {
          var parent = element.parent();
          element.text(newText + '...');
          parent.height(eventHeight);
          parent.addClass('truncated');
        });
      };
      var unbindTruncationEvents = function () {
        var parent = element.parent();
        parent.unbind('mouseenter');
        parent.unbind('mouseleave');
      };
      var timeUpdate = function () {
        // wait for dom repaint
        // kind of a hack
        // set text only on first run
        setTimeout(function () {
          if (!text) {
            text = element.text();
          }
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