const mongoose = require('mongoose');

const { Schema } = mongoose;

const GenreSchema = new Schema({
    genre: {
        type: String,
        required: [true, 'Cannot be empty'],
        trim: true,
        unique: true,
        minLength: 5,
    },
});
const Genre = mongoose.model('genre', GenreSchema);
module.exports = Genre;
