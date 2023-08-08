const fs = require('fs');

// Load the contents of the .env file
const envContents = fs.readFileSync('.env', 'utf-8');

// Parse the contents and convert them into an object
const envVariables = envContents
    .split('\n')
    .filter(line => line.trim() !== '') // Remove empty lines
    .reduce((result, line) => {
        const [key, value] = line.split('=');
        result[key] = value;
        return result;
    }, {});

const username = envVariables['USERNAME'];
const password = envVariables['PASSWORD'];
const path = envVariables['PATH_TO_WEBSITE_DOCUMENT']

const headers = new Headers();
headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));

fetch(path, {
    method: 'GET',
    headers: headers,
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(text => {
        fs.writeFileSync('data.txt', text, 'utf-8');
        console.log('Data saved to data.txt file!');
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
