const fs = require('fs');
const Collection = require('./Collection');
const Const = require('./Const');
const Random = require('./Random');
const Model = require('./Model');



const locate = function (map, position) {
    const size = map.length,
        x = position.x,
        y = position.y,
        value = map[x][y];
    return (value == -1) ? null :
        (x > 0 && map[x - 1][y] == value) ?
        new Model.Domino(new Model.Point(x, y), new Model.Point(x - 1, y)) :
        (x < size - 1 && map[x + 1][y] == value) ?
        new Model.Domino(new Model.Point(x, y), new Model.Point(x + 1, y)) :
        (y > 0 && map[x][y - 1] == value) ?
        new Model.Domino(new Model.Point(x, y), new Model.Point(x, y - 1)) :
        (x < size - 1 && map[x][y + 1] == value) ?
        new Model.Domino(new Model.Point(x, y), new Model.Point(x, 1 + y)) : null;
}

const near = function (map, position, condition) {
    const set = Random.from(Const.DIRECTS_SETS);
    let domino = null; 
    Array.from(set).every((element) => {
        const point = new Model.Point(
            position.x + Const.DIRECT_MOVE[parseInt(element)].x,
            position.y + Const.DIRECT_MOVE[parseInt(element)].y
        );
       
        if (Collection.isInside(map, point) && condition) {            
            domino =  locate(map,point);
            return false;
        }
        return true; 
    });
    return domino; 

}

const neighborhood = function (map, domino) {

    if (domino == null) return null;
    const size = map.length,
        first = domino.first,
        second = domino.second,
        type = first.x == second.x ? Const.VERTICAL : Const.HORIZONTAL;
    let delta = Random.from([-1, 1]);
    if (type == Const.VERTICAL) {
        let x = first.x + delta;
        x = (x > 0 && x < size) ? x : first.x - delta;
        if (x > 0 && x < size) {
            if (map[x][first.y] == map[x][second.y])
                return new Model.Domino(new Model.Point(x, first.y), new Model.Point(x, second.y));
        }
    } else if (type == Const.HORIZONTAL) {
        let y = first.y + delta;
        y = (y > 0 && y < size) ? y : first.y - delta;

        if (y > 0 && y < size) {
            if (map[first.x][y] == map[second.x][y])
                return new Model.Domino(new Model.Point(first.x, y), new Model.Point(second.x, y));
        }
    }
    return null;
}

const neighborhoods = function (map, domino) {

    if (domino == null) return null;
    const size = map.length,
        first = domino.first,
        second = domino.second,
        type = first.x == second.x ? Const.VERTICAL : Const.HORIZONTAL;
    let dominos = [];

    [-1, 1].forEach(delta => {
        if (type == Const.VERTICAL) {
            let x = first.x + delta;
            if (x >= 0 && x < size) {
                if (map[x][first.y] == map[x][second.y])
                    dominos.push(new Model.Domino(new Model.Point(x, first.y), new Model.Point(x, second.y)));
            }
        } else if (type == Const.HORIZONTAL) {
            let y = first.y + delta;
            if (y > 0 && y < size) {
                if (map[first.x][y] == map[second.x][y])
                    dominos.push(new Model.Domino(new Model.Point(first.x, y), new Model.Point(second.x, y)));
            }
        }
    })

    return dominos;
}

const swap = function (map, firstdomino, seconddomino) {
    if (firstdomino == null || seconddomino == null) return -1;
    Collection.swap(map, firstdomino.second, seconddomino.first);
}
const fillMap = (size) => {
    let map = (JSON.parse(fs.readFileSync(Const.MAPS_STORE))[size + ""]),
        count = Math.floor(size ** (2));
    while (count--) {
        const first = locate(map, Random.positionInMap(map));
        const second = neighborhood(map, first);
        swap(map, first, second);
    }

    return map;
};

module.exports = {
    fillMap,
    neighborhoods,
    near
    
}