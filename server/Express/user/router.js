const router = require('express').Router()
const view = require('./view')

router.get('/',view.response);

module.exports = router;