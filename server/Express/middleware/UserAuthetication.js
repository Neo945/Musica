const jwt = require('jsonwebtoken');
const User = require('../user/schema');

async function UserAuthentication(req,res,next) {
    if (req.cookies.jwt){
        jwt.verify(req.cookies.jwt,process.env.SECRET_KEY,(err,id)=>{
            if (err){
                console.log(err);
                req.user = null;
                next();
            }else{
                User.findById(id)
                .then(user => req.user = user)
                .catch(erro => console.log(erro));
                next();
            }
        })    
    }else{
        req.user = null;
        next();
    }
}
module.exports = UserAuthentication;