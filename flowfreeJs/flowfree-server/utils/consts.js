const TOP = 0,
    RIGHT = 1,
    BOTTOM = 2,
    LEFT = 3;
const DIRECT_MOVE = [{
        x: -1,
        y: 0
    },
    {
        x: 0,
        y: 1
    },
    {
        x: 1,
        y: 0
    },
    {
        x: 0,
        y: -1
    }
];
const DIRECTS_SETS = ["0123", "2310", "1230", "0231", "3120", "1203", "0312", "1302", "3102", "3210", "2130", "2013"];
const PORT = 5555;
const VERTICAL = 32,
    HORIZONTAL = 64;
const MAPS_STORE = "maps.json";    

module.exports = {
    VERTICAL,
    HORIZONTAL,
    MAPS_STORE
}