"use strict";

const {Wit, log} = require('node-wit');

var getIntents = function (textMessage, callback) {
	const client = new Wit({accessToken: process.env.WIT_AI_ACCESS_TOKEN});
	client.message(textMessage, {})
	.then((data) => {
	  console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
	  console.log(data.entities.intent[0].value)
	  callback(null, data.entities.intent[0].value);
	})
	.catch((error) => {
		console.log(error);
		callback("An error occurred", null)
	});
};

module.exports.getIntents = getIntents;

