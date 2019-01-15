const int = (value) => (value <= 0 ? 0 : Math.floor(Math.random() * value));

const between = (first, second) => (first >= second) ? second : first + int(second - first);

const from = (array) => array[int(array.length)];

const property = (object) => {
    const key = from(Object.keys(object));
    return {
        key: key,
        value: object[key]
    }
};

const positionInMap = (map) => ({
    x: int(map.length),
    y: int(map.length)
});





module.exports = {
    int: int,
    between: between,
    from: from,
    property: property,
    positionInMap: positionInMap
}