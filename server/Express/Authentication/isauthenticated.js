function isAuthenticated(req, res, next) {
    if (req.cookies.jwt && req.user) {
        next();
    } else {
        res.status(403).json({ message: 'Not Authenticated' });
    }
}
module.exports = isAuthenticated;
