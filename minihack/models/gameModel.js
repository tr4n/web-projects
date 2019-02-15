const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 


const NameSchema = new Schema({
    gameId: {
        type: String,
        unique: true, 
        require: true
    },
    first: {
        type: String, 
        default: null
    },
    second: {
        type: String, 
        default: null
    },
    third: {
        type: String, 
        default: null
    }, 
    fourth: {
        type: String, 
        default: null
    }
});

module.exports = mongoose.model('Name', NameSchema);