const Joi = require('joi');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, './.env') });

const schema = Joi.object()
    .keys({
        ATLAS_URI: Joi.string().required().description('MongoDB atlas link'),
        PORT: Joi.number().default(3000),
        PROTOCOL: Joi.string().default('http'),
        HOST: Joi.string().default('localhost'),
        SECRET_KEY: Joi.string().required().description('Secret key for jwt'),
        CLIENT_ID: Joi.string().required().description('GCP client oauth id'),
        CLIENT_SECRET: Joi.string().required().description('Secret key GCP oauth'),
        S3_ACCESS_KEY_ID: Joi.string().required().description('Access key user'),
        SECRET_S3_ACCESS_KEY: Joi.string().required().description('Secret key user'),
        S3_BUCKET_REGION: Joi.string().required().description('S3 bucket region'),
        EMAIL_SERVICE: Joi.string().required().description('Email server'),
        USER_EMAIL: Joi.string().required().description('Email of user'),
        USER_PASSWORD: Joi.string().required().description('Email password'),
        NODE_ENV: Joi.string().required().description('Environment'),
    })
    .unknown();

const { value: env, error: err } = schema.prefs({ errors: { label: 'key' } }).validate(process.env);
if (err) throw Error(err);

module.exports = env;
