const under = (value) => (value <= 0 ? 0 : Math.floor(Math.random() * value));

const between = (first, second) => (first >= second) ? second : first + under(second - first);

const from = (array) => array[under(array.length)];

const property = (object) => {
    const key = from(Object.keys(object));
    return {
        key: key,
        value: object[key]
    }
};

const positionInMap = (map) => ({
    x: under(map.length),
    y: under(map.length)
});





module.exports = {
    under: under,
    between: between,
    from: from,
    property: property,
    positionInMap: positionInMap
}