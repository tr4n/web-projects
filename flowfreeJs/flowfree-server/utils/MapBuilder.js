const fs = require('fs');
const Convert = require('./Convert');
const Random = require('./Random');
const Const = require('./Const');
const Domino = require('./Domino');
const Model = require('./Model');

let map = Domino.fillMap(5);

console.log(map, "\n--------------------\n");


let domino = Domino.near(map, new Model.Point(map.length-1, map.length -1));
console.log(domino);
