module.exports = function (timePosition) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      event: '=event'
    },
    templateUrl: '/angularTemplates/eventTemplate.html',
    link: function (scope, element, attr) {
      var buildDiv = function () {
        var position = timePosition.startAndEnd(element.parent(), scope.event.startTime, scope.event.endTime);
        console.log('hey', position);
        var width = element.parent().width()/(scope.event.overlaps + 1);
        element.css({
          top: position.start,
          height: position.end - position.start,
          left: scope.event.overlapPos * width,
          width: width
        });
      };
      scope.$watch('event.overlaps', buildDiv);
    }
  };
};