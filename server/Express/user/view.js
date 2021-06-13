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
    console.log(req.body,username,pass);
    const token = await User.login(username,pass);
    if (token){
        res.cookie('jwt',token,{
            maxAge:3 * 24 * 3600 * 1000
        });
        console.log(req.headers);
        // res.set('Access-Control-Allow-Origin', req.headers.origin); //req.headers.origin
        // res.set('Access-Control-Allow-Credentials', 'true');
        // res.set(
            // 'Access-Control-Expose-Headers',
            // 'date, etag, access-control-allow-origin, access-control-allow-credentials'
        // );
        res.json({mesage:'Success'});
    }else{
        res.clearCookie('jwt');
        res.json({mesage:'User not found'});
    }
}
function logout(req,res){
    res.clearCookie('jwt');
    res.json({mesage:'Logged out successfully'});
}
module.exports = {
    response,
    addUser,
    getAllUser,
    addUserAsync,
    login,
    logout
};