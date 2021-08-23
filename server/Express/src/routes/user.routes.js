const router = require('express').Router();
const view = require('../controllers/user.controllers');
const isa = require('../middleware/authCheck.middleware');
const passport = require('../config/passport.config');

router.post('/add', view.register);
router.get('/users', isa, view.getAllUser);
router.post('/login', view.login);
router.get('/logout', isa, view.logout);

router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
);
router.get('/google/redirect', passport.authenticate('google'), view.googleOauthRedirect);

module.exports = router;
