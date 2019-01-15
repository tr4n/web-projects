const fs = require('fs');
const Convert = require('./Convert');
const Random = require('./Random');
const Consts = require('./consts');
const Domino = require('./Domino');

let map = Domino.fillMap(6);

console.log("\n--------------------\n", map);