// this is here instead of saving the code to a database
// or as a session variable. Seemed like a simpler solution
// for the scope of this challenge.

var code;

exports.setCode = function (newCode) {
  code = newCode; 
};
exports.getCode = function() {
  return code;
};