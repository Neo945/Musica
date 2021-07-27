const Joi = require('joi');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const schema = Joi.object().keys({
    ATLAS_URI: Joi.string().required().description('MongoDB atlas link'),
    PORT: Joi.number().default(3000),
    SECRET_KEY: Joi.string().required().description('Secret key for jwt'),
    CLIENT_ID: Joi.string().required().description('GCP client oauth id'),
    CLIENT_SECRET: Joi.string().required().description('Secret key GCP oauth'),
    S3_ACCESS_KEY_ID: Joi.string().required().description('Access key user'),
    SECRET_S3_ACCESS_KEY: Joi.string().required().description('Secret key user'),
    S3_BUCKET_REGION: Joi.string().required().description('S3 bucket region'),
}).unknown();

const { value: env, error: err } = schema.prefs({ errors: { label: 'key' } }).validate(process.env);
if (err) throw Error(err);

module.exports = env;
