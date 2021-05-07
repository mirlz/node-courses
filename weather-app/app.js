const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
const yargs = require('yargs');

const input = yargs.argv._[0];

if(input) {
    geocode(input, (error, { latitude, longtitude, location } = {})=> {
        if(error) {
            return console.log(error);
        }

        forecast(latitude, longtitude, (forecastError, forecastData) => {
            if(forecastError) {
                return console.log(forecastError);
            }

            console.log('Forecast');
            console.log('Location: ', location)
            console.log('Data: ', forecastData);
        });
    });
} else {
    console.log('Need to provide a location!');
}