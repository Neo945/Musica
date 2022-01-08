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
const upload = (bucket) =>
    multer({
        storage: multerS3({
            s3: s3,
            bucket: bucket,
            metadata: function (req, file, cb) {
                console.log('file metadata ', file);
                cb(null, { fieldName: file.fieldname });
            },
            key: function (req, file, cb) {
                console.log('file key ', file);
                const fileName = file.originalname.split('.');
                const ext = fileName[fileName.length - 1]?.toLowerCase() ? fileName[fileName.length - 1]?.toLowerCase() : '';
                cb(null, `${req.user?._id}/${req.body.title}.${ext}`);
            },
        }),
    });
const uploadSingle = upload('musica-music').single('audio');
const uploadSingleImage = upload('musica-music').single('profileImage');

module.exports = { uploadSingle, s3, uploadSingleImage };
