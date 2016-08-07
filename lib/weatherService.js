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
        weatherInput.lat = res[0].latitude;
        weatherInput.long = res[0].longitude;
        callback(null, weatherInput);
    });
}

module.exports.getWeather = getWeather;