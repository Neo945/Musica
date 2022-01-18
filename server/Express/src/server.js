// Import libraries
const express = require('express');
const http = require('http');
const path = require('path');
require('./config/passport.config');
const cp = require('cookie-parser');
const cs = require('cookie-session');
const passport = require('passport');
const helmet = require('helmet');
require('./config/s3.config');
const morgan = require('./config/morgan.config');
const env = require('./config/config');

// Create Express App
const app = express();

/**
 *  Register middlewares
 * - Helmet to secure the app
 * - Morgan to log the requests
 * - Cookie Parser to parse the cookies
 * - Cookie Session to store the session
 * - Passport to authenticate the user
 * - Static files to serve the static files
 * - View Engine to render the views
 * - Body Parser to parse the body of the request (by default JSON parser by express)
 * - CORS to allow cross origin requests (custom headers)
 * - Error Handler to handle API errors
 * - Routes to handle the API requests
 * */
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

// Hosted URL
const URL =
    process.env.NODE_ENV === 'production' ? 'https://muscia.herokuapp.com' : `${env.PROTOCOL}://${env.HOST}:${env.PORT}`;

// Routes for the API (all the routes are prefixed with /api)
app.use('/api', express.json(), require('./router'));

app.use('/static', express.static(path.join(__dirname, 'static')));

// Create http server
const server = http.createServer(app);

// Integrate websocket with server
require('./config/socket.config')(server);

module.exports = { server, URL };
