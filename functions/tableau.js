var request = require('request');

var tableau= {};

tableau.getTicket = function(serverUrl, username, ip, callback) {
  var options = { method: 'POST',
    url: serverUrl + '/trusted',
    headers:
     { 'Content-Type': 'application/x-www-form-urlencoded' },
    form: { username: username } };

  request(options, function (error, response, body) {
    if (error) {
      callback({
        result: "error",
        error: error
      })
    } else {
      callback({
        result: "success",
        ticket: body
      });
    }

  });
}

module.exports = tableau;
