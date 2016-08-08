var Forecast     = require('forecast');
var NodeGeocoder = require('node-geocoder');
 
var options = {
    provider: 'google',

    httpAdapter: 'https',
    apiKey: process.env.GEO_CODING_API_KEY,
    formatter: null
};

var forecast = new Forecast({
  service: 'forecast.io',
  key: process.env.FORECAST_IO_API_KEY,
  units: 'celcius',
  cache: true,
  ttl: {
    minutes: 30,
    seconds: 0
    }
});

var geocoder = NodeGeocoder(options);
 

var getWeatherDetails = function (weatherInput, callback) {
    geocoder.geocode(weatherInput.location, function(err, res) {
        weatherInput.lat = res[0].latitude;
        weatherInput.long = res[0].longitude;
        getWeather(weatherInput, function (err, res) {
            callback(null, res);
        });
        
    });
}

var getWeather = function (weatherInput, callback) {
    forecast.get([weatherInput.lat, weatherInput.long], function(err, res) {
        if(err) {
            callback(err, null);
        }
        else if (weatherInput.time - Date.now() < 0) {
            weatherText = 'Summary: ' + res.currently.summary + '\n';
            weatherText += 'Temp: ' + res.currently.temperature + 'C\n';
            weatherText += 'Humidity: ' + (res.currently.humidity * 100) + '%';
            weatherInput.text = weatherText;
            callback(null, weatherInput);         
        }
        else {
            for (it in res.daily.data) {
                if (weatherInput.time/1000 - res.daily.data[it].time < 86400) {
                    weatherText = 'Summary: ' + res.daily.data[it].summary + '\n';
                    weatherText += 'Min Temp: ' + res.daily.data[it].temperatureMin + 'C\n';
                    weatherText += 'Max Temp: ' + res.daily.data[it].temperatureMax + 'C';
                    weatherInput.text = weatherText;
                    callback(null, weatherInput);
                    break;        
                }
            }
        }
    });
}

module.exports.getWeatherDetails = getWeatherDetails;