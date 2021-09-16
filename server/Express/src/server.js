const express = require('express');
const cors = require('cors');
const path = require('path');
require('./config/passport.config');
const cp = require('cookie-parser');
const cs = require('cookie-session');
const passport = require('passport');
require('./config/s3.config');

const app = express();

app.use(
    cs({
        maxAge: require('./config/config').TOKEN_LENGTH,
        keys: require('./config/config').SECRET_KEY,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cp());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
if (process.env.NODE_ENV === 'development') app.use(require('morgan')('dev'));
app.use(require('./middleware/UserAuth.middleware'));
// app.use('/api', require('./router'));
app.get('/', (req, res) => {
    res.send('Hello! from muscia, and setup done');
});

app.use('/static', express.static(path.join(__dirname, 'public')));

module.exports = app;
