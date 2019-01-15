const fs = require('fs');
const Collection = require('./Collection');
const Consts = require('./consts');
const Random = require('./Random');

let Point = function (_x, _y) {
    this.x = _x;
    this.y = _y;
}

let One = function (_first, _second) {
    this.first = _first;
    this.second = _second;
}

const locate = function (map, position) {
    const size = map.length,
        x = position.x,
        y = position.y,
        value = map[x][y];
    return (value == -1) ? null :
        (x > 0 && map[x - 1][y] == value) ?
        new One(new Point(x, y), new Point(x - 1, y)) :
        (x < size - 1 && map[x + 1][y] == value) ?
        new One(new Point(x, y), new Point(x + 1, y)) :
        (y > 0 && map[x][y - 1] == value) ?
        new One(new Point(x, y), new Point(x, y - 1)) :
        (x < size - 1 && map[x][y + 1] == value) ?
        new One(new Point(x, y), new Point(x, 1 + y)) : null;
}

const neighborhood = function (map, domino) {

    if (domino == null) return null;
    const size = map.length,
        first = domino.first,
        second = domino.second,
        type = first.x == second.x ? Consts.VERTICAL : Consts.HORIZONTAL;
    if (type == Consts.VERTICAL) {
        let x = first.x + Random.from([-1, 1]);
        if (x <= 0 || x >= size) x = -x;
        if (x > 0 && x < size) {
            if (map[x][first.y] == map[x][second.y])
                return new One(new Point(x, first.y), new Point(x, second.y));
        }
    } else if (type == Consts.HORIZONTAL) {
        let y = first.y + Random.from([-1, 1]);
        if (y <= 0 || y >= size) y = -y;
        if (y > 0 && y < size) {
            if (map[first.x][y] == map[second.x][y])
                return new One(new Point(first.x, y), new Point(second.x, y));
        }
    }
    return null;
}

const swap = function (map, firstDomino, secondDomino) {
    if (firstDomino == null || secondDomino == null) return -1;
    Collection.swap(map, firstDomino.second, secondDomino.first);
}
const fillMap = (size) => {
    let map = (JSON.parse(fs.readFileSync(Consts.MAPS_STORE))[size + ""]),
        count = Math.floor(size **(1.5));
    while (count--) {
        const first = locate(map, Random.positionInMap(map));
        const second = neighborhood(map, first);
        swap(map, first, second);
    }
    return map;
};

module.exports = {
    fillMap
}