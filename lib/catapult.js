"use strict";

var CatapultClient = require('node-bandwidth');

var client = new CatapultClient({
    userId    : process.env.BANDWIDTH_CLIENT_USER_ID,
    apiToken  : process.env.BANDWIDTH_CLIENT_API_TOKEN,
    apiSecret : process.env.BANDWIDTH_CLIENT_API_SECRET
});

var sendMessage = function (sendTo, content) {

	client.Message.send({
        from : process.env.BANDWIDTH_PHONE_NUMBER, 
        to   : sendTo,
        text : content
    })
    .then(function(message) {
        console.log('Message sent with ID ' + message.id);
        response.send(200);
    })
    .catch(function(err) {
        response.status(500).send('An error occurred.');
    });
}

module.exports.sendMessage = sendMessage;