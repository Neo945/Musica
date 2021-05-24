const User = require('./schema');

function response(req,res){
    res.json({message:'message from user'});
}

function addUser(req,res){
    const username = req.body.username;
    const nu = new User({username});
    nu.save()
    .then(() => res.json({message:'user added'}))
    .catch(err => res.status(400).json('Error: ' + err));
}
function getAllUser(req,res){
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
}

module.exports = {
    response,
    addUser,
    getAllUser
};