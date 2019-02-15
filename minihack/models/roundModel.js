const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 


const RoundSchema = new Schema({
    gameId: {
        type: String, 
        require: true
    },
    roundId:{
        type: Number,
        require: true
    },
    first: {
        type: Number, 
        default: null
    },
    second: {
        type: Number, 
        default: null
    },
    third: {
        type: Number, 
        default: null
    }, 
    fourth: {
        type: Number, 
        default: null
    }
});

module.exports = mongoose.model('Round', RoundSchema);