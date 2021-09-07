const passport = require('passport');
const bcrypt = require('bcrypt');
const GoogleStratagy = require('passport-google-oauth20');
const { errorOHandler } = require('../utils/errorHandler');
const env = require('./config');
const { User } = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
    done(null, await User.findById(id));
});

passport.use(
    new GoogleStratagy(
        {
            clientID: env.CLIENT_ID,
            clientSecret: env.CLIENT_SECRET,
            callbackURL: 'http://localhost:5000/api/auth/google/redirect',
        },
        async (access, refresh, email, done) => {
            const existingUser = await User.findOne({ email: email.emails[0].value });
            if (existingUser) {
                done(null, existingUser);
            } else {
                errorOHandler(async () => {
                    const newUser = await User.create({
                        isVerified: true,
                        username: email.displayName,
                        email: email.emails[0].value,
                        password: await bcrypt.genSalt(),
                    });
                    done(null, newUser);
                });
            }
        }
    )
);
module.exports = passport;
