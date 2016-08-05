"use strict";

var Clarifai = require('clarifai');

Clarifai.initialize({
  'clientId': process.env.CLARIFAI_CLIENT_ID,
  'clientSecret': process.env.CLARIFAI_CLIENT_SECRET
});

var getImageTags = function(media) {
  Clarifai.getTagsByUrl([
    media
  ]).then(
    handleResponse,
    handleError
  );
};

function handleResponse(response){
  console.log('promise response:', JSON.stringify(response));
  console.log(response.results[0].classes);
};

function handleError(err){
  console.log('promise error:', err);
};

module.exports.getImageTags = getImageTags;