const express = require('express');
const path = require('path');
const webSocketServer = require('websocket').server;
const http = require('http');
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
if (process.env.NODE_ENV === 'development') app.use(require('morgan')('dev'));
// app.use(require('./middleware/UserAuth.middleware'));

// app.get('/', async (req, res) => {
//     //     res.render('index', { name: 'Hello' });
//     res.send('Hello! from muscia, and setup done');
// });

const URL = process.env.NODE_ENV === 'production' ? 'https://muscia.herokuapp.com' : `http://localhost:${env.PORT}`;

app.use('/api', express.json(), require('./router'));

app.use('/static', express.static(path.join(__dirname, 'static')));

const server = http.createServer(app);
// eslint-disable-next-line new-cap
const wsServer = new webSocketServer({
    httpServer: server,
    autoAcceptConnections: false,
});

wsServer.on('request', (request) => {
    const connection = request.accept(null, request.origin);
    console.log('Connection accepted', connection);
    connection.on('message', (message) => {
        console.log(message);
    });
    connection.send('Hi there!');
});

module.exports = { server, wsServer, URL };
