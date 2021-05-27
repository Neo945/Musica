const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail  = require('validator').default.isEmail;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type:String,
        required:[true,'Please fill the username'],
        unique:[true,'Already taken'],
        trim:true,
        minlength: 5
    },
    password:{
        type:String,
        required:[true,'Please fill the passwords'],
        trim:true,
        unique:true,
        minlength: [10,'Please Length less than 10']
    },
    email:{
        type:String,
        required:[true,'Please fill the email'],
        unique:[true,'Already have a account'],
        lowercase:true,
        trim:true,
        minlength: [10,'Email Length less than 10'],
        validate:[isEmail,'Invalid email']
    }
},{
    timestamps:true,
});

UserSchema.pre('save',async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

UserSchema.post('save', function (doc,next){
    console.log(doc);
    next();
})

// UserSchema.path('email').validate(()=>{
// 
// },'Error')


const User = mongoose.model('user',UserSchema);
module.exports = User;