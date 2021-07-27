const router = require('express').Router();
const view = require('../controllers/music.controllers');
const isa = require('../middleware/authCheck.middleware');

router.post('/add/album', isa, view.addAlbum);
router.get('/get/album', isa, view.getAlbum);

module.exports = router;
