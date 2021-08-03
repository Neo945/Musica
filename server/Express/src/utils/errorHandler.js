module.exports = {
    errorHandler: function (req, res, cb) {
        try {
            cb();
        } catch (err) {
            console.log(err.message);
            const data = Object.values(err.errors);
            const error = [];
            data.forEach((ele) => {
                error.push(ele.message);
            });
            res.status(403).json({ message: error });
        }
    },
    errorOHandler: function (cb) {
        try {
            cb();
        } catch (err) {
            const data = Object.values(err.errors);
            const error = [];
            data.forEach((ele) => {
                error.push(ele.message);
            });
            console.log({ message: error });
        }
    },
};
