const router = require('express').Router();
const view = require('../controllers/music.controllers');
// const isa = require('../middleware/authCheck.middleware');

router.post('/add/album', view.createAlbum);
router.get('/get/album', view.getAllUserAlbum);
router.post('/upload', view.createMusic);
router.post('/genre', view.saveGenre);
router.get('/get/audio', view.getAudio);

module.exports = router;
