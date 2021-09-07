/* eslint-disable no-await-in-loop */
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

TagsSchema.statics.saveTags = async function (music, tagsList) {
    // eslint-disable-next-line no-restricted-syntax
    for (const tag of tagsList) {
        const tagExists = await this.findOne({ tag });
        if (!tagExists) {
            const newTag = await this.create({ tag });
            await music.tags.push(newTag);
            await music.save();
        } else {
            await music.tags.push(tagExists);
            await music.save();
        }
    }
};

const Tag = mongoose.model('tags', TagsSchema);
module.exports = Tag;
