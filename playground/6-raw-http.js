const http = require('http');

const url = 'http://api.weatherstack.com/current?access_key=97e75a2b838dc42b223d6ac900b86d17&query=45,-75&units=m';

const request = http.request(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
        data += chunk.toString();
    });
    response.on('end', () => {
        const body = JSON.parse(data);
        console.log(body);
    });
});

request.on('error', (error) => {
    console.log('An error occurred: ', error);
});

request.end();