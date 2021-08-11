const router = require('express').Router();
const view = require('../controllers/music.controllers');
const isa = require('../middleware/authCheck.middleware');

router.post('/add/album', isa, view.createAlbum);
router.get('/get/album', isa, view.getAllUserAlbum);
router.post('/upload', view.createMusic);
router.get('/get', view.getMusic);

module.exports = router;
