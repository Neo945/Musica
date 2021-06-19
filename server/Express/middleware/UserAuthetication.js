const jwt = require('jsonwebtoken');
const {User, Artist} = require('../user/schema');

async function UserAuthentication(req,res,next) {
    if (req.cookies.jwt){
        jwt.verify(req.cookies.jwt,process.env.SECRET_KEY,(err,id)=>{
            if (err){
                console.log(err);
                req.user = null;
                next();
            }else{
                Artist.findOne({user:id.id})
                // .populate('user')
                .then(user => {
                    console.log(user);
                    req.user = user;
                    next();
                })
                .catch(erro => console.log(erro));
                // User.findById(id.id)
                // .then(user => {
                    // req.user = user;
                    // next();
                // })
                // .catch(erro => console.log(erro));
            }
        })    
    }else{
        req.user = null;
        next();
    }
}
module.exports = UserAuthentication;