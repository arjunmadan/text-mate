"use strict";

var Clarifai = require('clarifai');
var request  = require('request');
var aws      = require('aws-sdk');

const s3 = new aws.S3();

Clarifai.initialize({
  'clientId': process.env.CLARIFAI_CLIENT_ID,
  'clientSecret': process.env.CLARIFAI_CLIENT_SECRET
});

var getImageTags = function (pictureUrl, callback) {
  Clarifai.getTagsByUrl([
    'https://s3.amazonaws.com/' + process.env.S3_BUCKET_NAME + '/media/' + pictureUrl
  ], function (err, res) {
        if (err) {
            callback(err, null);
        }
        else {
            let resultArray = res.results[0].result.tag.classes;
            let resultString = 'This is likely an image with: ';
            for (let i = 0; i < resultArray.length - 1; i++) {
                if (resultString.length > 140) {
                    resultString += resultArray[i] + '.';
                    callback(null, resultString)
                    break;
                }
                resultString += resultArray[i] + ', ';
            }
            
        }
  });
};

var putImageS3 = function (pictureUrl, callback) {
	let url = 'https://' + process.env.BANDWIDTH_CLIENT_API_TOKEN + ':' 
        + process.env.BANDWIDTH_CLIENT_API_SECRET + '@api.catapult.inetwork.com/v1/users/' 
        + process.env.BANDWIDTH_CLIENT_USER_ID + '/media/' + pictureUrl;

    request({
        url: url,
        encoding: null
    }, function(err, res, body) {
        if (err) {
            return callback(err, res);
        }

        s3.putObject({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: 'media/' + pictureUrl,
            ContentType: res.headers['content-type'],
            ContentLength: res.headers['content-length'],
            Body: body
        }, function (err, res) {
            if (err) {
                console.log(err);
                callback(err, null);
            }
            else {
                console.log(res);
                callback(null, pictureUrl);
            }
        });
    });
}

module.exports.getImageTags = getImageTags;
module.exports.putImageS3 = putImageS3;