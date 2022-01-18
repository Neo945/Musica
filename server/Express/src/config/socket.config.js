const socketio = require('socket.io');
const SocketUserAuthMiddleware = require('../middleware/SocketUserAuth.middleware');

module.exports = (server) => {
    const io = socketio(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });
    io.use(SocketUserAuthMiddleware);
    io.on('connection', (socket) => {
        socket.on('joinVerify', ({ room }) => {
            socket.join(room);
            socket.on('id', ({ id }) => {
                socket.broadcast.to(room).emit('id', id);
            });
            socket.on('send', () => socket.broadcast.to(room).emit('send', 'id'));
            socket.on('success', (success) => {
                socket.broadcast.to(room).emit('success', { success });
            });
        });
    });
    return io;
};
