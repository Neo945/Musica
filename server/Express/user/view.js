const User = require('./schema');

function response(req,res){  
    res.json({message:'message from user'});
}

function addUser(req,res){
    const username = req.body;
    console.log(req.body)
    const nu = new User({...req.body});
    nu.save()
    .then((g) => res.json({message:'user added',...g}))
    .catch(err => res.status(400).json('Error: ' + err));
}

async function addUserAsync(req,res){
    console.log(req.body)
    try{
        const nu = await User.create({...req.body});
        res.status(201).json(nu);
    }catch(err){
        console.log(err.message);
        const data = Object.values(err.errors);
        let error = []
        data.forEach((ele) =>{
            error.push(ele.message);
        })
        // console.log(err);
        res.status(403).json({message:error});
    }
}

function getAllUser(req,res){
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
}

async function login(req,res) {
    const {password:pass,username:username} = req.body;
    res.cookie('jwt',await User.login(username,password),{
        maxAge:3 * 24 * 3600 * 1000
    })
    res.json({mesage:'Success'});
}

module.exports = {
    response,
    addUser,
    getAllUser,
    addUserAsync,
    login
};