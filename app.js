"use strict";

var express    = require("express");
var bandwidth  = require("node-bandwidth");
var bodyParser = require("body-parser");
var app        = express();

bandwidth.Client.globalOptions.apiToken  = process.env.BANDWIDTH_CLIENT_API_TOKEN;
bandwidth.Client.globalOptions.apiSecret = process.env.BANDWIDTH_CLIENT_API_SECRET;
bandwidth.Client.globalOptions.userId    = process.env.BANDWIDTH_CLIENT_USER_ID; 

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(request, response) {
    response.send("Message received.");
});

app.post('/messages', function(request, response) {
    //console.log(JSON.stringify(request));
    console.log(request);
    //console.log(request.body);
    //console.log(request.body.text);
    response.send('Message received.');
});

app.listen(app.get('port'), function() {
  console.log('TextMate is now running.');
});