const mongoose = require('mongoose');

const { Schema } = mongoose;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Cannot be empty'],
        trim: true,
        unique: true,
        minLength: 5,
    },
    artist: {
        type: Schema.Types.ObjectId, ref: 'artist',
    },
    music: [{
        type: Schema.Types.ObjectId, ref: 'music',
    }],
}, {
    timestamps: true,
});
const Album = mongoose.model('album', AlbumSchema);
module.exports = Album;
