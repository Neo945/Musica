const router = require('express').Router();

// router.use('/auth', require('./routes/user.routes'));
router.use('/music', require('./routes/music.routes'));

module.exports = router;
