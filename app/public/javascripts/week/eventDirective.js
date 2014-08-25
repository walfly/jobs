module.exports = function (timePosition) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      event: '=event'
    },
    templateUrl: '/angularTemplates/eventTemplate.html',
    link: function (scope, element, attr) {
      var update = function () {
        var position = timePosition.startAndEnd(element.parent(), scope.event.startTime, scope.event.endTime);
        var offset = element.parent().width()/(10 + scope.event.overlaps);
        var width = element.parent().width() - (scope.event.overlaps * offset);
        element.css({
          'top': position.start,
          'height': position.end - position.start,
          'left': scope.event.overlapPos * offset,
          'width': width
        });
        if (scope.event.overlapPos > 0) {
          element.addClass('overlapping');
        }
      };
      scope.$watch('event.overlaps', update);
    }
  };
};