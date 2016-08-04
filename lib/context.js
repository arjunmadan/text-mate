"use strict";

const {Wit, log} = require('node-wit');

var getIntents = function (textMessage) {
	const client = new Wit({accessToken: process.env.WIT_AI_ACCESS_TOKEN});
	client.message(textMessage, {})
	.then((data) => {
	  console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
	  //To process intents here to figure out which API to call.
	})
	.catch(console.error);	
};

module.exports.getIntents = getIntents;

