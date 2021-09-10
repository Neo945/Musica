const mongoose = require('mongoose');
const env = require('./config/config');
const app = require('./server');

mongoose.connect(env.ATLAS_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    console.clear();
    console.log('Connection with database established successfully');
    app.listen(env.PORT, () => {
        console.log(`Server is running on port: ${env.PORT}`);
        console.log(`Environment: ${env.NODE_ENV}`);
    });
});
