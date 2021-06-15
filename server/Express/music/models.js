const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MusicSchema = new Schema({
    title:{
        type: String,
        required: [true],
        trim: true,
        unique: true,
        minLength: 5
    },
    length:{
        type: Number,
        required: [true],
        min: 0
    }
},{
    timestamps:true,
});
const Music = mongoose.model('music',MusicSchema);
module.exports = Music;