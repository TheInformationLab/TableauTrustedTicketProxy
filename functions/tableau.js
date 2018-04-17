var request = require('request');

var tableau= {};

tableau.getTicket = function(serverUrl, username, ip) {
  var options = { method: 'POST',
    url: serverUrl + '/trusted',
    headers:
     { 'Content-Type': 'application/x-www-form-urlencoded' },
    form: { username: username } };

  request(options, function (error, response, body) {
    if (error) {
      res.send({
        result: "error",
        error: error
      })
    } else {
      res.send({
        result: "success",
        ticket: body
      });
    }

  });
}

module.exports = tableau;
