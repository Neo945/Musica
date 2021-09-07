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
        link: {
            type: String,
            required: [true, 'Please Provide a link'],
            trim: true,
            unique: true,
            validate: [isURL, 'Prease provide a valid link'],
        },
        length: {
            type: Number,
            required: [true],
            validate: {
                validator: function (v) {
                    return v > 0;
                },
                message: (props) => `${props.value} Length cannot be 0 ${props}`,
            },
            min: 0,
        },
        artists: [{ type: Schema.Types.ObjectId, ref: 'artist' }],
        tags: [{ type: Schema.Types.ObjectId, ref: 'tags' }],
        language: { type: Schema.Types.ObjectId, ref: 'language' },
        genre: [{ type: Schema.Types.ObjectId, ref: 'genre' }],
    },
    {
        timestamps: true,
    }
);
const Music = mongoose.model('music', MusicSchema);
module.exports = Music;
