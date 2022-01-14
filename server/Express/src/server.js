const express = require('express');
const http = require('http');
const path = require('path');
require('./config/passport.config');
const cp = require('cookie-parser');
const cs = require('cookie-session');
const passport = require('passport');
const helmet = require('helmet');
require('./config/s3.config');
const morgan = require('./config/morgan');
const env = require('./config/config');

const app = express();

app.use(
    cs({
        maxAge: env.TOKEN_LENGTH,
        keys: env.SECRET_KEY,
    })
);
app.use(helmet());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// eslint-disable-next-line consistent-return
app.all('*', (req, res, next) => {
    if (!req.get('Origin')) return next();
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Methods', 'GET,POST', 'PUT', 'DELETE');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
    if (req.method === 'OPTIONS') return res.send(200);
    next();
});

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cp());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan.errorHandler);
    app.use(morgan.successHandler);
}
// app.use(require('./middleware/UserAuth.middleware'));

// app.get('/', async (req, res) => {
//     //     res.render('index', { name: 'Hello' });
//     res.send('Hello! from muscia, and setup done');
// });

const URL =
    process.env.NODE_ENV === 'production' ? 'https://muscia.herokuapp.com' : `${env.PROTOCOL}://${env.HOST}:${env.PORT}`;

app.use('/api', express.json(), require('./router'));

app.use('/static', express.static(path.join(__dirname, 'static')));

const server = http.createServer(app);

require('./config/socket.config')(server);

module.exports = { server, URL };
