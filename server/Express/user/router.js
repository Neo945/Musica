const router = require('express').Router()
const User = require('./schema');
const view = require('./view');
const isa = require('../Authentication/isauthenticated');

// router.get('/',view.response);
router.post('/add',view.addUserAsync);
router.get('/users',isa,view.getAllUser);
router.get('/',view.response);
router.post('/login',view.login);


// router.get('/cookie-test',function (req,res) {
    // const {password:pass,username:user} = req.body;
    // res.setHeader('Set-Cookie','jwt=jwt');
    // res.cookie('jwt','jwt',{ maxAge:1000,secure:true /* https */ , httpOnly:true });
    // console.log(req.cookies);
// })

module.exports = router;