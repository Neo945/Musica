const router = require('express').Router()

router.use('/auth',require('./user/router'));
router.use('/music',require('./music/router'));

module.exports = router