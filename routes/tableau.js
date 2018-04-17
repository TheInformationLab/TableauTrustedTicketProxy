var crypt = require('../config/encrypt');
var apiKeys = require('../config/apiKeys');
var tableau = require('../functions/tableau');

module.exports = function(app) {
  app.post('/tableau/login', function(req, res) {
    var key = req.headers['authorization'];
    var serverUrl = req.body.server;
    var username = req.body.username;
    var ip = req.body.ip;
    if (crypt.decrypt(key) == crypt.decrypt(apiKeys.proxy)) {
      tableau.getTicket(serverUrl, username, ip, function(obj) {
        if (obj.result == "success") {
          res.send({
            result: "Success",
            ticket: obj.ticket
          });
        } else {
          res.send({
            result: "Error",
            error: "Can't retrieve trusted ticket"
          });
        }
      });
    } else {
      res.send({
        result: "Error",
        error: "Invalid API key"
      })
    }

  });
};
