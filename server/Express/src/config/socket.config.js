const socketio = require('socket.io');

module.exports = (server) => {
    const io = socketio(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });
    io.on('connection', (socket) => {
        socket.on('joinVerify', ({ room }) => {
            socket.join(room);
            socket.on('id', ({ id }) => {
                socket.to(room).emit('id', id);
            });
            socket.on('send', () => socket.to(room).emit('send', 'id'));
        });
        // console.log('a user connected');

        // socket.emit('message', 'User');
        // socket.broadcast.emit('message', 'User');
    });
    return io;
};
