module.exports = {
    errorHandler: async function (req, res, cb) {
        try {
            await cb();
        } catch (err) {
            // console.log(err.message);
            const data = Object.values(err.errors);
            const error = [];
            data.forEach((ele) => {
                error.push(ele.message);
            });
            res.status(403).json({ message: error });
        }
    },
    errorOHandler: async function (cb) {
        try {
            await cb();
        } catch (err) {
            console.log({ message: err.message });
        }
    },
};
