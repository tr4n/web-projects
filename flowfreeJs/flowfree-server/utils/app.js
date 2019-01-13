const fs = require('fs');
const convert = require('./convert');
const random = require('./random');

maps = JSON.parse(fs.readFileSync("dominos.json"));

let value = random.getProperty(maps).value;
console.log(value);
