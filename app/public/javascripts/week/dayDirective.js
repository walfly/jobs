module.exports = function () {
  return {
    restrict: 'E',
    scope: {
      dayModel: '=dayModel'
    },
    replace: true,
    templateUrl: '/angularTemplates/dayTemplate.html',
    link: function (scope, element, attr){

    }
  };
};