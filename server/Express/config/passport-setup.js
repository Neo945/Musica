const passport = require('passport');
const GoogleStratagy = require('passport-google-oauth20');
const env = require('./config');

passport.use(new GoogleStratagy({
        clientID:env.CLIENT_ID,
        clientSecret:env.CLIENT_SECRET,
        callbackURL:'http://localhost:5000/api/auth/google/redirect'
    }, (access, refresh,email, done)=>{
        console.log('email ',email);
    }
));
module.exports = passport;