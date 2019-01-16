
const swap = function (map, A, B) {
    let temp = map[A.x][A.y];
    map[A.x][A.y] = map[B.x][B.y];
    map[B.x][B.y] = temp;
}

const isInside = (map, position) => (position.x >= 0 && position.x < map.length && position.y >= 0 && position.y < map.length);


module.exports = {
    swap, 
    isInside
}