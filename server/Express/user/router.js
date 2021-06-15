const router = require('express').Router()
const User = require('./schema');
const view = require('./view');
const isa = require('../Authentication/isauthenticated');

router.post('/add',view.addUserAsync);
router.get('/users',isa,view.getAllUser);
router.get('/',view.response);
router.post('/login',view.login);
router.get('/logout',view.logout);


module.exports = router;