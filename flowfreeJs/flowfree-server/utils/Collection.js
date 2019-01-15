const swap = function (map, A, B) {
    let temp = map[A.x][A.y];
    map[A.x][A.y] = map[B.x][B.y];
    map[B.x][B.y] = temp;
}



module.exports = {
    swap
}