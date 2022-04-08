const mongoose = require('mongoose');
const { isURL } = require('validator').default;

const { Schema } = mongoose;

const MusicSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Cannot be empty'],
            trim: true,
            unique: true,
            minLength: 5,
        },
        linkAWS: {
            type: String,
            required: [true, 'Please Provide a link'],
            trim: true,
            unique: true,
            validate: [isURL, 'Prease provide a valid link'],
        },
        link: {
            type: String,
            required: [true, 'Please Provide a link'],
            trim: true,
            unique: true,
            validate: [isURL, 'Prease provide a valid link'],
        },
        length: {
            type: Number,
            required: true,
            validate: {
                validator: function (v) {
                    return v > 0;
                },
                message: (props) => `${props.value} Length cannot be 0 ${props}`,
            },
            min: 0,
        },
        lyrics: {
            type: String,
            trim: true,
            minLength: 5,
        },
        plays: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Artist',
            },
        ],
        artist: {
            type: Schema.Types.ObjectId,
            ref: 'Artist',
            required: [true, 'Please provide an artist'],
        },
        likes: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
        comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
        collab: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
        tags: [{ type: Schema.Types.ObjectId, ref: 'Tags' }],
        language: { type: Schema.Types.ObjectId, ref: 'Language' },
        genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
    },
    {
        timestamps: true,
    }
);
const Music = mongoose.model('music', MusicSchema);
module.exports = Music;
