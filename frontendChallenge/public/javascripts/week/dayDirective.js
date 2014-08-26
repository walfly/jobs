module.exports = function () {
  return {
    restrict: 'E',
    scope: {
      day: '=day'
    },
    replace: true,
    templateUrl: '/angularTemplates/dayTemplate.html',
    link: function (scope, element, attr){
      // drag events would go here
    }
  };
};