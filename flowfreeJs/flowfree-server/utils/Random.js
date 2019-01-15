const nextInt = (value) => (value <= 0 ? 0 : Math.floor(Math.random() * value));

const getInt = (first, second) => (first >= second) ? second : first + nextInt(second - first);

const getElement = (arrays) => arrays[nextInt(arrays.length)];

const getProperty = (object) => {
    const key = getElement(Object.keys(object));
    return {
        key: key,
        value: object[key]
    }
};

const getPositionMap = (map) => ({
    x: nextInt(map.length),
    y: nextInt(map.length)
});





module.exports = {
    nextInt,
    getInt,
    getElement,
    getProperty,
    getPositionMap
}