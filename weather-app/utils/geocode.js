const request = require('request');

const geocode = (address, callback) => {
    const mapboxurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWlybHoiLCJhIjoiY2tvY29zemF0MDUxcjJ2cGl6Mm9jdTlvcCJ9.GCYcDfY4j5eyPqm3UAKXMQ';

    request({ url: mapboxurl, json: true}, (error, {body}) => {
        const { features } = body;

        if (error) {
            callback('Unable to connect to location service!', undefined);   
        } else if (features.length === 0) {
            callback('No matching results.', undefined);
        } else {
            const { center, place_name } = features[0];

            callback(undefined, {
                latitude: center[1],
                longtitude: center[0],
                location: place_name
            });
        }
    });
};

module.exports = geocode;