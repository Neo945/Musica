const router = require('express').Router();
const view = require('../controllers/user.controllers');
const isa = require('../middleware/authCheck.middleware');
const passport = require('../config/passport.config');

router.post('/add', view.addUserAsync);
router.get('/users', isa, view.getAllUser);
router.post('/login', view.login);
router.get('/logout', view.logout);

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));
router.get('/google/redirect', passport.authenticate('google'), view.googleOauthRedirect);

module.exports = router;
