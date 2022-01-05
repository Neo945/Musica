const express = require('express');
const cors = require('cors');
const path = require('path');
require('./config/passport.config');
const cp = require('cookie-parser');
const cs = require('cookie-session');
const passport = require('passport');
require('./config/s3.config');
const env = require('./config/config');

const app = express();

app.use(
    cs({
        maxAge: env.TOKEN_LENGTH,
        keys: env.SECRET_KEY,
    })
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(passport.initialize());
app.use(passport.session());
app.use(cp());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
if (process.env.NODE_ENV === 'development') app.use(require('morgan')('dev'));
// app.use(require('./middleware/UserAuth.middleware'));
// app.use('/api', require('./router'));

app.get('/', (req, res) => {
    res.render('index', {name : 'Hello'});
});

// app.get('/', (req, res) => {
//     res.send('Hello! from muscia, and setup done');
// });

app.use('/static', express.static(path.join(__dirname, 'public')));

const URL = process.env.NODE_ENV === 'production' ? 'https://muscia.herokuapp.com' : `http://localhost:${env.PORT}`;

module.exports = {app, URL};
