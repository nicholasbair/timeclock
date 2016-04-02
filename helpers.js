var helpers = {};

helpers.getId = function(id) {
  return document.getElementById(id);
};

helpers.appendZero = function(n) {
  n = n.toString();
  if (n.length != 2) {
    n = '0' + n;
  }
  return n;
};

module.exports = helpers;
