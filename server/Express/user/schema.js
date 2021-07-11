const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isEmail  = require('validator').default.isEmail;
const isMobilePhone  = require('validator').default.isMobilePhone;
const isStrongPassword  = require('validator').default.isStrongPassword;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    googleID:{
        type:String,
        unique:[true,'Already taken'],
        trim:true,
    },
    isOauth:{
        typle: Boolean,
        required: [true, 'Please specify the method'],
    },
    username:{
        type:String,
        required:[true,'Please fill the username'],
        unique:[true,'Already taken'],
        trim:true,
        minlength: 5
    },
    password:{
        type:String,
        trim:true,
        validate:[isStrongPassword,'not a strong password'],
        unique:true,
        minlength: [10,'Password Length less than 10']
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

const ArtistsSchema = new Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    isArtist:{
        type: Boolean,
        required: true,
        default: false
    },
    language:{
        type: mongoose.Types.ObjectId,
        ref: 'language'
    },
    phone:{
        type: String,
        required: true,
        trim:true,
        unique: true,
        minLength: 12,
        validate:[isMobilePhone,'Invalid Phone number']
    },
    name:{
        type:String,
        required:[true,'Please fill the name'],
        unique:[true,'Already have a account'],
        trim:true,
        minlength: [10,'Name length less than 10'],
    },
    age:{
        type:Number,
        required: true,
        min: [12,'Grow Up'],
    }
});

UserSchema.pre('save',async function (next) {
    if (!this.isOauth){
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(this.password,salt);
        next();
    }
    if (this.googleID){
        next();
    }else{
        throw new Error('Please verify your google ID');
    }
})

UserSchema.post('save',function (doc,next){
    console.log(doc);
    next();
});
function getToken(id){
    return jwt.sign({id},require('../config/config').SECRET_KEY,{
        expiresIn: 3*24*3600
    })
}
UserSchema.statics.login = async function(username,password) {
    const user = await this.findOne({ username });
    if (await bcrypt.compare(password,user.password)){
        return getToken(user._id);
    }
}


const User = mongoose.model('user',UserSchema);
const Artist = mongoose.model('artist',ArtistsSchema);
module.exports = {
    User,
    Artist
};