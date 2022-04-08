const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema(
    {
        comment: {
            type: String,
            required: true,
            trim: true,
        },
        likes: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
        artist: {
            type: Schema.Types.ObjectId,
            ref: 'Artist',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
