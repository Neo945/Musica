const mongoose = require('mongoose');
const { isURL } = require('validator').default;

const { Schema } = mongoose;

const MessageSchema = new Schema(
    {
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
            enum: ['image', 'video', 'text'],
        },
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
