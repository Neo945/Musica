const passport = require('passport');
const GoogleStratagy = require('passport-google-oauth20');
const env = require('./config');
const {User} = require('../user/schema');

passport.serializeUser((user,done)=>{
    done(null,user._id);
});
passport.deserializeUser(async (id,done)=>{
    done(null,await User.findById(id));
})

passport.use(new GoogleStratagy({
        clientID:env.CLIENT_ID,
        clientSecret:env.CLIENT_SECRET,
        callbackURL:'http://localhost:5000/api/auth/google/redirect'
    },async (access, refresh,email, done)=>{
        const user = await User.findOne({googleID:email.id});
        if (user){
            console.log('Current user ' , user);
            done(null,user);
        }else{
            done(null,await User.create({
                    googleID: email.id,
                    username: email.displayName,
                    email: email.emails[0].value,
                    isOauth: true,
                })
            );
        }
    }
));
module.exports = passport;