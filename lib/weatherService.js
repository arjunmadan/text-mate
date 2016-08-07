var NodeGeocoder = require('node-geocoder');
 
var options = {
    provider: 'google',

    httpAdapter: 'https',
    apiKey: process.env.GEO_CODING_API_KEY,
    formatter: null
};
 
var geocoder = NodeGeocoder(options);
 

var getWeather = function (weatherInput, callback) {
    geocoder.geocode(weatherInput.location, function(err, res) {
        console.log(res);
        callback(null, res);
    });
}

module.exports.getWeather = getWeather;