const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const cp = require('cookie-parser');
const env = require('./config/config');

const app = express();

mongoose.connect(env.ATLAS_URI,
    {
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology: true
    });
mongoose.connection.once('open',()=>{
    console.log("Connection with database established successfully");
});

app.use(cp());
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));
app.use(express.json());
app.use(require('./middleware/logger'));
app.use(require('./middleware/UserAuthetication'));

app.use('/static',express.static(path.join(__dirname,'public')));

app.use('/api',require('./router'));

app.listen(env.PORT,()=>{
    console.log(`Server is running on port: ${env.PORT}`);
});