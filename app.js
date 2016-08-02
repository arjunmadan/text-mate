"use strict";

var express   = require("express");
var bandwidth = require("node-bandwidth");
var app       = express();

bandwidth.Client.globalOptions.apiToken = BANDWIDTH_CLIENT_API_TOKEN;
bandwidth.Client.globalOptions.apiSecret = BANDWIDTH_CLIENT_API_SECRET;
bandwidth.Client.globalOptions.userId = BANDWIDTH_CLIENT_USER_ID; 

app.set('port', (process.env.PORT || 5000));

app.post('/messages', function(request, response) {
  console.log(JSON.stringify(request));
  console.log(request.body.text);
  response.send('Message received.');
});
