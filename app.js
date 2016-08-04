"use strict";

var express         = require("express");
var CatapultClient  = require("node-bandwidth");
var bodyParser      = require("body-parser");
var app             = express();
var context         = require("./lib/context");

var client = new CatapultClient({
    userId    : process.env.BANDWIDTH_CLIENT_USER_ID,
    apiToken  : process.env.BANDWIDTH_CLIENT_API_TOKEN,
    apiSecret : process.env.BANDWIDTH_CLIENT_API_SECRET
});

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/messages', function(request, response) {
    context.getIntents(request.body.text);
    client.Message.send({
        from : process.env.BANDWIDTH_PHONE_NUMBER, 
        to   : request.body.from,
        text : "Hello world."
    })
    .then(function(message) {
        console.log("Message sent with ID " + message.id);
        response.send(200);
    })
    .catch(function(err) {
        console.log(err.message);
    });
});

app.listen(app.get('port'), function() {
  console.log('TextMate is now running.');
});