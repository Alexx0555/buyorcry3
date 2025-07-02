const jwt = require('jsonwebtoken');
const User = require('../models/User');

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using a valid token" });
    } else {
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            const userId = data.user.id;
            const user = await User.findById(userId);
            req.user = user;
            next();
        } catch (error) {
            console.error(error);
            res.status(401).send({ errors: "please authenticate using a valid token" });
        }
    }
}

module.exports = fetchUser;