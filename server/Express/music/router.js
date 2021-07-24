const router = require('express').Router();
const view = require('./view');
const isa = require('../Authentication/isauthenticated');

router.post('/add/album', isa, view.addAlbum);
router.get('/get/album', isa, view.getAlbum);

module.exports = router;
