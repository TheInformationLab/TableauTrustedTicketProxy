var crypt = require('../config/encrypt');
const apiKeys = require('../config/apiKeys');
var tableau = require('../functions/tableau');

module.exports = function(app) {
  app.post('/tableau/login', function(req, res) {
    var key = req.headers['authorization'];
    var serverUrl = req.body.server;
    var username = req.body.username;
    var ip = req.body.ip;
    if (key && crypt.decrypt(key) == crypt.decrypt(apiKeys.proxy)) {
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
    } else {
      res.send({
        result: "Error",
        error: "Invalid API key"
      })
    }

  });
};
