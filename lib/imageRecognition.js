"use strict";

var Clarifai = require('clarifai');

Clarifai.initialize({
  'clientId': process.env.CLARIFAI_CLIENT_ID,
  'clientSecret': process.env.CLARIFAI_CLIENT_SECRET
});

function getImageTags(media) {
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

getImageTags();