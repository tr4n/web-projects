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

let get = function (map, position) {
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

let getNeighborhood = function (map, domino) {

    if (domino == null) return null;
    const size = map.length,
        firstPoint = domino.first,
        secondPoint = domino.second,
        type = firstPoint.x == secondPoint.x ? Consts.VERTICAL : Consts.HORIZONTAL;
    if (type == Consts.VERTICAL) {
        let x = firstPoint.x + Random.getElement([-1, 1]);
        if (x <= 0 || x >= size) x = -x;
        if (x > 0 && x < size) {
            if (map[x][firstPoint.y] == map[x][secondPoint.y])
                return new One(new Point(x, firstPoint.y), new Point(x, secondPoint.y));
        }
    } else if (type == Consts.HORIZONTAL) {
        let y = firstPoint.y + Random.getElement([-1, 1]);
        if (y <= 0 || y >= size) y = -y;
        if (y > 0 && y < size) {
            if (map[firstPoint.x][y] == map[secondPoint.x][y])
                return new One(new Point(firstPoint.x, y), new Point(secondPoint.x, y));
        }
    }
    return null;
}

const swap = function (map, firstDomino, secondDomino) {
    if (firstDomino == null || secondDomino == null) return -1;
    Collection.swap(map, firstDomino.second, secondDomino.first);
}

module.exports = {
    get,
    swap,
    getNeighborhood
}