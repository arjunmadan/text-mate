"use strict";

const {Wit, log} = require('node-wit');

var getIntents = function (message, callback) {
    const client = new Wit({accessToken: process.env.WIT_AI_ACCESS_TOKEN});
    client.message(message, {})
    .then((data) => {
        var returnValue = {};
        console.log(JSON.stringify(data));
        if (data.entities) {
            if (data.entities.intent[0]) {
                if (data.entities.intent[0].value === 'weather') {
                    returnValue.intentType = 'weather';
                    try {
                        if (data.entities.location[0].value !== null) {
                            returnValue.location = data.entities.location[0].value;
                        }
                        if (data.entities.datetime[0].type === 'interval') {
                            returnValue.timeType = 'hour';
                            let date = new Date(data.entities.datetime[0].to.value);
                            returnValue.time = date.getTime();
                        }
                        else if (data.entities.datetime[0].type === 'value') {
                            returnValue.timeType = 'day';
                            let date = new Date(data.entities.datetime[0].to.value);
                            returnValue.time = date.getTime();
                        }
                        callback(null, returnValue);    
                    }
                    catch (err) {
                        if (data.entities.location === undefined) {
                            callback("There was no location specified.", null);
                        }
                        else {
                            returnValue.timeType = 'day'
                            returnValue.time = Date.now();
                            callback(null, returnValue);    
                        }
                    }
                }
            }
        }
        
    })
    .catch((error) => {
        console.log(error);
        callback("An error occurred", null)
    });
};

module.exports.getIntents = getIntents;