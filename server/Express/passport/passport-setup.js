const passport = require('passport');
const GoogleStratagy = require('passport-google-oauth20');
const env = require('../config/config');

passport.use(new GoogleStratagy({
        clientID:env.CLIENT_ID,
        clientSecret:env.CLIENT_SECRET
    }), ()=>{
        //callback
    }
)