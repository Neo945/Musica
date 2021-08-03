const { User, Artist } = require('../models/user');
const { errorHandler } = require('../utils/errorHandler');

module.exports = {
    getAllUser: (req, res) => {
        errorHandler(req, res, () => {
            User.find()
                .then((users) => res.json(users))
                .catch((err) => res.status(400).json(`Error: ${err}`));
        });
    },
    addInfo: (req, res) => {
        errorHandler(req, res, async () => {
            const nua = await Artist.findOne({ user: req.user._id });
            nua.save();
            res.status(201).json({ message: 'success', user: nua });
        });
    },
    register: (req, res) => {
        errorHandler(req, res, async () => {
            const nu = await User.create({ ...req.body });
            await User.create({ user: nu._id });
            res.status(201).json({ message: 'success', user: nu });
        });
    },
    login: (req, res) => {
        errorHandler(req, res, async () => {
            const { password: pass, email } = req.body;
            const token = await User.login(email, pass);
            if (token) {
                res.cookie('jwt', token, {
                    maxAge: 3 * 24 * 3600 * 1000,
                });
                console.log(req.headers);
                res.json({ mesage: 'Success' });
            } else {
                res.clearCookie('jwt');
                res.json({ mesage: 'User not found' });
            }
        });
    },
    logout: (req, res) => {
        errorHandler(req, res, () => {
            req.logout();
            res.clearCookie('jwt');
            res.json({ mesage: 'Logged out successfully' });
        });
    },
    googleOauthRedirect: (req, res) => {
        res.redirect('http://localhost:3000/');
    },
};
