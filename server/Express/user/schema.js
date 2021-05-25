const mongoose = require('mongoose');
const isEmail  = require('validator').default.isEmail;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength: 10
    },
    password:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        minlength: [10,'Password Length less than 10']
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        minlength: [10,'Email Length less than 10'],
        validate:[isEmail,'Invalid email']
    }
},{
    timestamps:true,
});

// UserSchema.path('email').validate(()=>{
// 
// },'Error')


const User = mongoose.model('user',UserSchema);
module.exports = User;