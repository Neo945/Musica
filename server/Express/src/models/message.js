const mongoose = require('mongoose');
const { isURL } = require('validator').default;

const { Schema } = mongoose;

const MessageSchema = new Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'Artist',
            required: [true, 'Please provide an artist'],
        },
        text: {
            type: String,
            required: true,
            trim: true,
            default: '',
        },
        objectUrl: {
            type: String,
            trim: true,
            validate: [isURL, 'Invalid URL'],
        },
        type: {
            type: String,
            required: true,
            default: 'text',
            enum: {
                values: ['text', 'image', 'video'],
                message: 'Invalid type of message {VALUE}',
            },
        },
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
