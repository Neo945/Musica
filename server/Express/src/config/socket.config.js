const socketio = require('socket.io');

module.exports = (server) => {
    const io = socketio(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });
    io.on('connection', (socket) => {
        console.log('a user connected boom');
        socket.on('joinVerify', ({ name, room }) => {
            socket.join(room);
            socket.to(room).emit('Message', `${name} Verification in progress`);
        });
        // console.log('a user connected');

        // socket.emit('message', 'User');
        // socket.broadcast.emit('message', 'User');
    });
    return io;
};
