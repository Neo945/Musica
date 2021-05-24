const router = require('express').Router()
const User = require('./schema');
const view = require('./view')

// router.get('/',view.response);
router.post('/add',view.addUser);
router.get('/',view.getAllUser);

module.exports = router;