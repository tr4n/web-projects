let Point = function (_x, _y) {
    this.x = _x;
    this.y = _y;
    this.equals = (other) => (this.x = other.x && this.y == other.y);
}

let Domino = function (_first, _second) {
    this.first = _first;
    this.second = _second;
    this.equals = (other) => (this.first.equals(other.first) && this.second.equals(other.second));
}



module.exports = {
    Point,
    Domino
}