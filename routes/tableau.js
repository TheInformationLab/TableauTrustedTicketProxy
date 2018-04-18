var crypt = require('../config/encrypt');
var apiKeys = require('../config/apiKeys');
var tableau = require('../functions/tableau');
var isHex = require('is-hex');

module.exports = function(app) {
  app.post('/tableau/login', function(req, res) {
    var key = req.headers['authorization'];
    var serverUrl = req.body.server;
    var username = req.body.username;
    var ip = req.body.ip;
    if (key && isHex(key) && crypt.decrypt(key) == crypt.decrypt(apiKeys.proxy)) {
      tableau.getTicket(serverUrl, username, ip, function(obj) {
        if (obj.result == "success") {
          res.send({
            result: "Success",
            ticket: obj.ticket
          });
        } else {
          res.send({
            result: "Error",
            error: obj.error
          });
        }
      });
    } else if (!key) {
      res.send({
        result: "Error",
        error: "Missing authorization header"
      });
    } else if (!isHex(key)) {
      res.send({
        result: "Error",
        error: "Authorization header is not a valid hexadecimal"
      });
    } else {
      res.send({
        result: "Error",
        error: "Invalid API key"
      })
    }

  });
};
