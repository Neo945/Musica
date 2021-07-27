/* eslint-disable no-new */
const express = require('express');
const cors = require('cors');
const path = require('path');
require('./config/passport-setup');
const cp = require('cookie-parser');
const cs = require('cookie-session');
const passport = require('passport');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const env = require('./config/config');

const app = express();

// S3 Bucket setup
const s3 = new aws.S3({
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.SECRET_S3_ACCESS_KEY,
    region: env.S3_BUCKET_REGION,
});
const upload = (bucket) => multer({
    storage: multerS3({
        s3: s3,
        bucket: bucket,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, 'auio.mp3');
        },
    }),
});

app.use(cs({
    maxAge: 24 * 60 * 60 * 1000,
    keys: require('./config/config').SECRET_KEY,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cp());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(require('./middleware/logger'));
app.use(require('./middleware/UserAuthetication'));

app.use('/static', express.static(path.join(__dirname, 'public')));
const uploadSingle = upload('musica-music').single(
    'croppedImage',
);

module.exports = app;
