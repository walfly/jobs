module.exports = function () {
  return {
    restrict: "A",
    link : function (scope, element, attr){
      var time = Number(attr.hour);
      var sHeight = element[0].scrollHeight;
      console.log(time, attr, element, sHeight);
      element.scrollTop(time * (sHeight/24));
    }
  };
};