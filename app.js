'use strict';

var express          = require('express');
var bodyParser       = require('body-parser');
var context          = require('./lib/context');
var imageRecognition = require('./lib/imageRecognition');
var catapult         = require('./lib/catapult');
var aws              = require('aws-sdk');

const s3 = new aws.S3();

var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/messages', function(request, response) {
    console.log(request.body);
    res.send(200);
    if(request.body.media.length > 0) {
        let imageUrlInfo = request.body.media[0].split('/');
        imageRecognition.putImageS3(imageUrlInfo[imageUrlInfo.length - 1], function (err, res) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(res);
                imageRecognition.getImageTags(imageUrlInfo[imageUrlInfo.length - 1], function (err, res) {
                    if (err) {
                        console.log(err);
                        catapult.sendMessage(request.body.from, "Sorry, an error occurred.");
                    }
                    else {
                        console.log('Got tags:' + res);
                        catapult.sendMessage(res);
                    }
                });
            }
        });
    }
    else {
        context.getIntents(request.body.text, function(err, result) {
            if (err) {
                catapult.sendMessage(request.body.from, "Sorry, an error occurred.");
            }
            else {
                catapult.sendMessage(request.body.from, result);
            }
        });
    }
    
});

app.listen(app.get('port'), function() {
  console.log('TextMate is now running.');
});