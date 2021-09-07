const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { isEmail } = require('validator').default;
const { isMobilePhone } = require('validator').default;
const { isStrongPassword } = require('validator').default;

const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        isVarified: {
            type: Boolean,
            default: false,
        },
        username: {
            type: String,
            required: [true, 'Please fill the username'],
            trim: true,
            minlength: 5,
        },
        password: {
            type: String,
            trim: true,
            required: [true, 'Please fill the password'],
            validate: [isStrongPassword, 'not a strong password'],
            unique: true,
            minlength: [10, 'Password Length less than 10'],
        },
        email: {
            type: String,
            required: [true, 'Please fill the email'],
            unique: [true, 'Already have a account'],
            lowercase: true,
            trim: true,
            minlength: [10, 'Email Length less than 10'],
            validate: [isEmail, 'Invalid email'],
        },
    },
    {
        timestamps: true,
    }
);

const ArtistsSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    language: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'language',
        },
    ],
    phone: {
        type: String,
        trim: true,
        unique: true,
        minLength: 12,
        validate: [isMobilePhone, 'Invalid Phone number'],
    },
    age: {
        type: Number,
        min: [12, 'Grow Up'],
    },
});

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.post('save', (doc, next) => {
    console.log(doc);
    next();
});
function getToken(id) {
    // eslint-disable-next-line global-require
    return jwt.sign({ id }, require('../config/config').SECRET_KEY, {
        expiresIn: 3 * 24 * 3600,
    });
}
UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (await bcrypt.compare(password, user.password)) {
        return getToken(user._id);
    }
    return null;
};

UserSchema.statics.generateEmailVerificationToken = async function (email) {
    const user = await this.findOne({ email });
    if (user) {
        const token = await bcrypt.hash(user._id, await bcrypt.genSalt());
        return token;
    }
    return null;
};

UserSchema.statics.verifyEmailToken = async function (id, token) {
    const user = await this.findById(id);
    if (await bcrypt.compare(token, user._id)) {
        user.isVerified = true;
        user.save();
        return true;
    }
    return false;
};

UserSchema.statics.savePass = async function (username, password) {
    const user = await this.findOne({ username });
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, salt);
    user.save();
};

const User = mongoose.model('user', UserSchema);
const Artist = mongoose.model('artist', ArtistsSchema);
module.exports = {
    User,
    Artist,
};
