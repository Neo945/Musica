const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

mongoose.connect(process.env.ATLAS_URI,
    {
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology: true
    });
mongoose.connection.once('open',()=>{
    console.log("Connection with database established successfully");
});

app.use(cors());
app.use(express.json());
app.use(require('./middleware/logger'));

app.use('/static',express.static(path.join(__dirname,'public')));

app.use('/api',require('./router'));

app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
});