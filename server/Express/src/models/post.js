const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
    description: {
        type: String,
        required: true,
        trim: true,
        default: '',
    },
    music: {
        type: Schema.Types.ObjectId,
        ref: 'music',
    },
}, {
    timestamps: true,
});
const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
