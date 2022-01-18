const jwt = require('jsonwebtoken');
const { Artist, User } = require('../models/user');

async function UserAuthentication(req, res, next) {
    if (req.cookies.jwt) {
        jwt.verify(req.cookies.jwt, process.env.SECRET_KEY, (err, id) => {
            if (err) {
                console.log(err);
                req.user = null;
                next();
            } else {
                User.findOne({ user: id.id })
                    .then(async (user) => {
                        console.log(user);
                        req.user = await Artist.findOne({ user: user._id }).populate('user', '-password');
                        next();
                    })
                    .catch((erro) => console.log(erro));
            }
        });
    } else {
        req.user = null;
        next();
    }
}
module.exports = UserAuthentication;
