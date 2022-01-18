// Import libraries
const mongoose = require('mongoose');
const env = require('./config/config');
const { server } = require('./server');
const logger = require('./config/logger.config');

// Establish connection to MongoDB
mongoose.connect(env.ATLAS_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

// Add Event Once the the connection with mongodb is established
mongoose.connection.once('open', () => {
    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    console.clear();
    console.log('Connection with database established successfully');
    logger.info('Mongoose connected');
    // Listen to the specified port (default port is 3000)
    server.listen(env.PORT, () => {
        logger.info('Server started');
        console.log(`Server is running on port: ${env.PORT}`);
        console.log(`Environment: ${env.NODE_ENV}`);
        console.log(`\t- ${env.PROTOCOL}://${env.HOST}:${env.PORT}`);
    });
});

// Handle unhandled Error on closing the server
const unexpectedErrorHandler = (error) => {
    logger.error(error);
    server.close(() => {
        logger.info('Server closed');
        mongoose.disconnect(() => {
            logger.info('Mongoose disconnected');
        });
        process.exit(1);
    });
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

// Handle Keyboard Interruption when the server is running
process.on('SIGINT', () => {
    // Close the server on Keyboard Interruption
    server.close(() => {
        logger.info('Server closed');
        // Disconnect from mongoDB server on Keyboard Interruption
        mongoose.disconnect(() => {
            logger.info('Mongoose disconnected');
            process.exit(1);
        });
    });
});
