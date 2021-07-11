const express = require('express');
const cors = require('cors');
const path = require('path');
require('./config/passport-setup')
const cp = require('cookie-parser');
const cs = require('cookie-session');
const passport = require('passport');


const app = express();


app.use(cs({
    maxAge: 24*60*60*1000,
    keys: require('./config/config').SECRET_KEY
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cp());
app.use(cors({origin:'http://localhost:3000',credentials:true}));
app.use(express.json());
app.use(require('./middleware/logger'));
app.use(require('./middleware/UserAuthetication'));

app.use('/static',express.static(path.join(__dirname,'public')));

app.use('/api',require('./router'));

module.exports = app;