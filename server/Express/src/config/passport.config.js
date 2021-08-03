const passport = require('passport');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const GoogleStratagy = require('passport-google-oauth20');
const { errorOHandler } = require('../utils/errorHandler');
const env = require('./config');
const { User, Artist } = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
    done(null, await User.findById(id));
});

passport.use(new GoogleStratagy({
    clientID: env.CLIENT_ID,
    clientSecret: env.CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/api/auth/google/redirect',
}, async (access, refresh, email, done) => {
    const user = await User.findOne({ googleID: email.id });
    if (user) {
        console.log('Current user ', user);
        done(null, user);
    } else {
        errorOHandler(async () => {
            const nu = await User.create({
                // eslint-disable-next-line radix
                _id: mongoose.Types.ObjectId(parseInt(email.id)),
                username: email.displayName,
                email: email.emails[0].value,
                password: await bcrypt.genSalt(),
            });
            // console.log(nu, email.id, email);
            await Artist.create({ user: nu._id });
            done(null, nu);
        });
    }
}));
module.exports = passport;
