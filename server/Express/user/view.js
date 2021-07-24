const {User,Artist} = require('./schema');

function addUser(req,res){
    console.log(req.body);
    const nu = new User({...req.body,isOauth:false});
    nu.save()
        .then((g) => res.json({message:'user added',...g}))
        .catch(err => res.status(400).json('Error: ' + err));
}

async function addUserAsync(req,res){
    try{
        const nu = await User.create({...req.body});
        const nua = await Artist.create({...req.body,user:nu._id});
        res.status(201).json(nua);
    }catch(err){
        console.log(err.message);
        const data = Object.values(err.errors);
        let error = [];
        data.forEach((ele) =>{
            error.push(ele.message);
        });
        res.status(403).json({message:error});
    }
}

function getAllUser(req,res){
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
}

async function login(req,res) {
    const {password:pass,email:email} = req.body;
    const token = await User.login(email,pass);
    if (token){
        res.cookie('jwt',token,{
            maxAge:3 * 24 * 3600 * 1000
        });
        console.log(req.headers);
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
function googleOauthRedirect(req,res){
    res.send('Google redirect');
}

module.exports = {
    addUser,
    getAllUser,
    addUserAsync,
    login,
    logout,
    googleOauthRedirect,
};