const router = require('express').Router();
const view = require('../controllers/user.controllers');
const isa = require('../middleware/authCheck.middleware');
const passport = require('../config/passport.config');

router.get('/users', isa, view.getUser);
router.get('/logout', isa, view.logout);
router.get('/send/email/', view.sendEmailVerfication);
router.get('/verify/email/', view.verifyEmailToken);
router.post('/register', view.registerUser);
router.post('/register/create/account', view.createArtistForExistingUser);
router.post('/login', view.login);

router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
);
router.get('/google/redirect', passport.authenticate('google'), view.googleOauthRedirect);

module.exports = router;
