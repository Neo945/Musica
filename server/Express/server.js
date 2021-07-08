const express = require('express');
const cors = require('cors');
const path = require('path');
const cp = require('cookie-parser');

const app = express();



app.use(cp());
app.use(cors({origin:'http://localhost:3000',credentials:true}));
app.use(express.json());
app.use(require('./middleware/logger'));
app.use(require('./middleware/UserAuthetication'));

app.use('/static',express.static(path.join(__dirname,'public')));

app.use('/api',require('./router'));

module.exports = app;