const moment = require('moment');

function logger(req, res, next) {
    console.log(`[${moment().format('YYYY/MM/DD, h:mm:ss')}]`, `${req.method} ${req.protocol}:/${req.get('host')}${req.url} ${res.statusCode}`);
    next();
}
module.exports = logger;
