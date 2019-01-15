const fs = require('fs');
const convert = require('./convert');
const random = require('./Random');

maps = JSON.parse(fs.readFileSync("dominos.json"));

let value = Random.getProperty(maps).value;
console.log(value);
