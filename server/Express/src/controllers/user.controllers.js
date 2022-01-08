const bcrypt = require('bcrypt');
const { User, Artist } = require('../models/user');
const { errorHandler } = require('../utils/errorHandler');
const transport = require('../config/mailer.config');
const { URL } = require('../server');

module.exports = {
    getUser: (req, res) => {
        errorHandler(req, res, async () => {
            const artist = await Artist.findOne({ user: req.user._id }).populate('user', '-password');
            res.status(200).json({ message: 'success', artist });
        });
    },
    createArtistForExistingUser: (req, res) => {
        errorHandler(req, res, async () => {
            if (req.body.user.isVerified) {
                const newArtistAccount = await Artist.create({ ...req.body, user: req.body.user._id });
                res.status(201).json({ message: 'success', user: newArtistAccount });
            } else res.status(400).json({ message: 'User is not varified, first verify and then create the user account' });
        });
    },
    registerUser: (req, res) => {
        console.log(req.body);
        errorHandler(req, res, async () => {
            const newUser = await User.create({ ...req.body, password: await bcrypt.genSalt(10) });
            res.status(201).json({ success: true, message: 'success', user: { ...newUser, password: null } });
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
        res.redirect(`${URL}/register/form`);
    },
    sendEmailVerfication: async (req, res) => {
        errorHandler(req, res, async () => {
            const { email } = req.body;
            const token = await User.generateEmailVerificationToken(email);
            if (token) {
                const url = `${URL}/verify/${token}`;
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
                res.json({ message: 'Email varified Now go back and complete teh form' });
            } else {
                res.json({ message: 'Email not verified' });
            }
        });
    },
};
