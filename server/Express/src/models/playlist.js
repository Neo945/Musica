const mongoose = require('mongoose');
const { isURL } = require('validator').default;

const { Schema } = mongoose;

const PlaylistSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Cannot be empty'],
            trim: true,
            unique: true,
            minLength: 5,
        },
        imageLink: {
            type: String,
            required: [true, 'Please Provide an image'],
            trim: true,
            unique: true,
            validate: [isURL, 'Prease provide a valid link'],
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'Artist',
        },
        description: {
            type: String,
            required: [true, 'Cannot be empty'],
            trim: true,
            unique: true,
            minLength: 5,
        },
        plays: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Artist',
            },
        ],
        genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
        language: { type: Schema.Types.ObjectId, ref: 'Language' },
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
const Playlist = mongoose.model('Album', PlaylistSchema);
module.exports = Playlist;
