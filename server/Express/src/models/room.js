const mongoose = require('mongoose');

const { Schema } = mongoose;

const RoomSchema = new Schema(
    {
        users: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
        messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    },
    {
        timestamps: true,
    }
);

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
