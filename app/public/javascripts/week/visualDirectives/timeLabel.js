module.exports = function () {
  return{
    compile: function (element) {
      var el;
      for(var i = 0; i < 24; i ++){
        var str = '';
        if(i % 12 === 0){
          str += '12';
        } else {
          str += i%12;
        }
        if(i >= 12){
          str += ' pm';
        } else {
          str += ' am';
        }
        if(i === 0){
          str = '';
        }
        el = angular.element('<div class="time-label label'+i+'">'+str+'</div>');
        element.append(el);
      }
    }
  };
};