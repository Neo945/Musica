const mongoose = require('mongoose');

const { Schema } = mongoose;

const LanguageSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Cannot be empty'],
        trim: true,
        unique: false,
        minLength: 1,
    },
    code: {
        type: String,
        required: [true, 'Cannot be empty'],
        unique: false,
        trim: true,
        minLength: 1,
    },
});
const Language = mongoose.model('language', LanguageSchema);

module.exports = Language;
