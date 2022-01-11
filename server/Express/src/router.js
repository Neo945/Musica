const router = require('express').Router();

router.use('/auth', require('./routes/user.routes'));
// router.use('/music', require('./routes/music.routes'));

// router.get('/', (req, res) => {
//     require('./config/socket.config')(require('./server').server).on('connection', (socket) => {
//         console.log('a user connected');
//     });
//     res.send('Hello! from muscia, and setup done');
// });

module.exports = router;
