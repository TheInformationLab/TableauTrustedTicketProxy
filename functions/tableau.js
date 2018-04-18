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
    } else if (body == "-1") {
      callback({
        result: "error",
        error: "Error -1 returned. Info to debug can be found here https://onlinehelp.tableau.com/current/server/en-us/trusted_auth_trouble_1return.htm"
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
