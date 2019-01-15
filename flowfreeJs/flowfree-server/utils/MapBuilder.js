const fs = require('fs');
const Convert = require('./Convert');
const Random = require('./Random');
const Consts = require('./consts');
const Domino = require('./Domino');



const getDominoMap = function (size) {
    const maps = JSON.parse(fs.readFileSync("dominos.json"));
    return maps[size + ""];
}





let map = getDominoMap(8);
console.log(map);

for (let i = 0; i < map.length ** 2; i++) {
    let first = Domino.get(map, Random.getPositionMap(map));
    let second = Domino.getNeighborhood(map, first);
    Domino.swap(map, first, second);
}

console.log("--------------------\n", map);