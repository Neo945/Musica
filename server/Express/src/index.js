const mongoose = require('mongoose');
const env = require('./config/config');
const { server } = require('./server');
const logger = require('./config/logger');

mongoose.connect(env.ATLAS_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    console.clear();
    console.log('Connection with database established successfully');
    server.listen(env.PORT, () => {
        console.log(`Server is running on port: ${env.PORT}`);
        console.log(`Environment: ${env.NODE_ENV}`);
        console.log(`\t- ${env.PROTOCOL}://${env.HOST}:${env.PORT}`);
    });
});
const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            mongoose.disconnect(() => {
                logger.info('Mongoose disconnected');
            });
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};
const closeHandler = () => {
    logger.info('Server closed');
    exitHandler();
};
server.on('error', unexpectedErrorHandler);
server.on('close', closeHandler);

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGINT', () => {
    server.close(() => {
        logger.info('Server closed');
        mongoose.disconnect(() => {
            logger.info('Mongoose disconnected');
        });
    });
});
