const router = require('express').Router();
const view = require('../controllers/music.controllers');
const isa = require('../middleware/authCheck.middleware');

router.post('/add/album', isa, view.createAlbum);
router.get('/get/album', isa, view.getAllUserAlbum);

module.exports = router;
