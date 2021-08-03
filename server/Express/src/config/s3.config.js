const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const env = require('./config');

const s3 = new aws.S3({
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.SECRET_S3_ACCESS_KEY,
    region: env.S3_BUCKET_REGION,
});
// eslint-disable-next-line no-unused-vars
const deleteParams = {
    Bucket: 'musica-music',
    key: '',
    Delete: {
        key: [],
    },
};
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
const uploadSingle = upload('musica-music').single('audio');

module.exports = { uploadSingle };
