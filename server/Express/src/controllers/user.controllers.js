const { User, Artist } = require('../models/user');
const { errorHandler } = require('../utils/errorHandler');
const transport = require('../config/mailer.config');

module.exports = {
    getUser: (req, res) => {
        errorHandler(req, res, async () => {
            const artist = await Artist.findOne({ user: req.user._id }).populate('user', '-password');
            res.status(200).json({ message: 'success', artist });
        });
    },
    createArtistForExistingUser: (req, res) => {
        errorHandler(req, res, async () => {
            const newArtistAccount = await Artist.create({ ...req.body, user: req.user._id });
            res.status(201).json({ message: 'success', user: newArtistAccount });
        });
    },
    registerUser: (req, res) => {
        errorHandler(req, res, async () => {
            const newUser = await User.create({ ...req.body });
            res.status(201).json({ message: 'success', user: { ...newUser, password: null } });
        });
    },
    login: (req, res) => {
        errorHandler(req, res, async () => {
            const { password, email } = req.body;
            const token = await User.login(email, password);
            if (token) {
                res.cookie('jwt', token, {
                    maxAge: require('../config/config').TOKEN_LENGTH,
                });
                res.status(201).json({ mesage: 'login Successful' });
            } else {
                res.clearCookie('jwt');
                res.json({ mesage: 'User not found' });
            }
        });
    },
    logout: (req, res) => {
        errorHandler(req, res, () => {
            try {
                req.logout();
            } catch (err) {
                console.log(err);
            }
            res.clearCookie('jwt');
            res.json({ mesage: 'Logged out successfully' });
        });
    },
    googleOauthRedirect: (req, res) => {
        res.redirect('http://localhost:3000/');
    },
    sendEmailVerfication: async (req, res) => {
        errorHandler(req, res, async () => {
            const { email } = req.body;
            const token = await User.generateEmailVerificationToken(email);
            if (token) {
                const url = `http://localhost:3000/verify/${token}`;
                const message = `<h1>Please verify your email</h1>
                    <p>Click on the link below to verify your email</p>
                    <a href="${url}">${url}</a>`;
                transport(req.user.email, 'Learnit Verification', message);
                res.json({ message: 'success' });
            } else {
                res.json({ message: 'User not found' });
            }
        });
    },
    verifyEmailToken: async (req, res) => {
        errorHandler(req, res, async () => {
            const { token } = req.query;
            const isVerified = await User.verifyEmailToken(req._id, token);
            if (isVerified) {
                res.json({ message: 'success' });
            } else {
                res.json({ message: 'User not found' });
            }
        });
    },
};
