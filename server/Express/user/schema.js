const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength: 10
    },
},{
    timestamps:true,
});

const User = mongoose.model('user',UserSchema);
module.exports = User;