const fs = require('fs');

const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = dataBuffer.toString();
const user = JSON.parse(dataJSON);

user.name = "Hello kitty";
user.age = 100;

const updatedString = JSON.stringify(user);
fs.writeFileSync('1-json.json', updatedString);