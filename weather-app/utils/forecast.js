const request = require('request');

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=97e75a2b838dc42b223d6ac900b86d17&query='+lat+','+lon+'&units=m';

    request({ url: url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location.', undefined);
        } else {
            const {weather_descriptions, temperature, feelslike} = body.current;
            
            callback(undefined, {
                weatherDesc: weather_descriptions[0],
                current: temperature,
                feelslike: feelslike
            });
        }
    });
};

module.exports = forecast;