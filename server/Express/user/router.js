const router = require('express').Router()
const User = require('./schema');
const view = require('./view');
const isa = require('../Authentication/isauthenticated');
const passport = require('../config/passport-setup');

router.post('/add',view.addUserAsync);
router.get('/users',isa,view.getAllUser);
router.post('/login',view.login);
router.get('/logout',view.logout);


router.get('/google',passport.authenticate('google',{
    scope:['profile','email']
}));
router.get('/google/redirect',passport.authenticate('google'),view.googleOauthRedirect);

module.exports = router;