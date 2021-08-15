const mongoose = require('mongoose');

const { Schema } = mongoose;

const TagsSchema = new Schema({
    tag: {
        type: String,
        required: [true, 'Cannot be empty'],
        trim: true,
        unique: true,
        minLength: 5,
    },
});
const Tag = mongoose.model('tags', TagsSchema);
module.exports = Tag;
