 const mongoose = require('mongoose');

 const Schema = mongoose.Schema;

 const  boardgamesSchema = new Schema(
    { 
        name: {type: String, required: true},
        year: {type: String, required: true},
        genre: {type: String, required: true},
        picture: {type: String, required: true}
    }, {
        timestamps: true
    }

);

const boardgames = mongoose.model('boardgame', boardgamesSchema)

module.exports = boardgames;