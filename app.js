"use strict";

var express          = require("express");
var CatapultClient   = require("node-bandwidth");
var bodyParser       = require("body-parser");
var context          = require("./lib/context");
var imageRecognition = require("./lib/imageRecognition");

var client = new CatapultClient({
    userId    : process.env.BANDWIDTH_CLIENT_USER_ID,
    apiToken  : process.env.BANDWIDTH_CLIENT_API_TOKEN,
    apiSecret : process.env.BANDWIDTH_CLIENT_API_SECRET
});

var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/messages', function(request, response) {
    console.log(request.body);
    if(request.body.media.length > 0) {
        imageRecognition.getImageTags(request.body.media[0]);
    }
    else {
        context.getIntents(request.body.text, function(err, result) {
            client.Message.send({
                from : process.env.BANDWIDTH_PHONE_NUMBER, 
                to   : request.body.from,
                text : result
            })
            .then(function(message) {
                console.log("Message sent with ID " + message.id);
                response.send(200);
            })
            .catch(function(err) {
                client.Message.send({
                    from : process.env.BANDWIDTH_PHONE_NUMBER, 
                    to   : request.body.from,
                    text : "An error occurred."
                })
                .then(function() {
                    response.status(500).send('This wasn\'t supposed to happen.');    
                })
                
            });
        });
    }
    
});

app.listen(app.get('port'), function() {
  console.log('TextMate is now running.');
});