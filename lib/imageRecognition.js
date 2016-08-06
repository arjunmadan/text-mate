"use strict";

var Clarifai = require('clarifai');
var request  = require('request');
var fs       = require('fs');

Clarifai.initialize({
  'clientId': process.env.CLARIFAI_CLIENT_ID,
  'clientSecret': process.env.CLARIFAI_CLIENT_SECRET
});

var getImageTags = function (media) {
  Clarifai.getTagsByUrl([
    'https://' + process.env.HEROKU_APP_NAME + '.herokuapp.com/testImage.png'
  ]).then(
    handleResponse,
    handleError
  );
};

function handleResponse(response){
  console.log('promise response:', JSON.stringify(response));
  console.log(response.results[0].classes);
  return response.results[0].classes;
};

function handleError(err){
  console.log('promise error:', err);
};

var getImage = function (pictureURL) {
	var picStream = fs.createWriteStream('./public/testImage.png');
	picStream.on('close', function() {
		console.log('done');
		getImageTags();
	});
	request.get(pictureURL, {
		'auth': {
			'user': process.env.BANDWIDTH_CLIENT_API_TOKEN,
			'pass': process.env.BANDWIDTH_CLIENT_API_SECRET,
			'sendImmediately': false
		}
	}).pipe(picStream);
}

module.exports.getImageTags = getImageTags;
module.exports.getImage = getImage;