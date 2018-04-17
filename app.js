const express = require('express');
var port = 3000;
var http = require('http'),
    app = express();
var bodyParser = require('body-parser');
var host = require('./config/host');
var jsonPackage = require('./package.json');

app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/tableau.js')(app);

app.listen(port, function() {
  console.log("Running version "+jsonPackage.version);
  console.log("Listening on "+host.base+":"+port);
});
