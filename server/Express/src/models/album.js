const mongoose = require('mongoose');

const { Schema } = mongoose;

const AlbumSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Cannot be empty'],
            trim: true,
            unique: true,
            minLength: 5,
        },
        artist: {
            type: Schema.Types.ObjectId,
            ref: 'Artist',
        },
        music: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Music',
            },
        ],
    },
    {
        timestamps: true,
    }
);
const Album = mongoose.model('Album', AlbumSchema);
module.exports = Album;
