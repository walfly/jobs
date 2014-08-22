module.exports = function (timePosition) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      event: '=event'
    }
    temaplateUrl: '/angularTemplates/eventTemplate.html',
    link: function (scope, element, attr) {
      var position = timePosition.startAndEnd(element.parent(), scope.event.startTime, scope.event.endTime);
    }
  };
};