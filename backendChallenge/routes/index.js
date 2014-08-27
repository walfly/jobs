var codeStore = require('../services/codeStore.js');

exports.redirect = function (req, res) {
  res.redirect('/authenticate');
};

exports.checkIfHasCode = function (req, res, next) {
  if(codeStore.getCode() !== undefined){
    next();
  } else {
    exports.redirect(req, res);
  }
};