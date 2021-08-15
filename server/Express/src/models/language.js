const mongoose = require('mongoose');

const { Schema } = mongoose;

const LanguageSchema = new Schema({
    lang: {
        type: String,
        required: [true, 'Cannot be empty'],
        trim: true,
        unique: true,
        minLength: 5,
    },
});
const Language = mongoose.model('language', LanguageSchema);

module.exports = Language;
