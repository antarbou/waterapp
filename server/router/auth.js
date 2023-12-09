
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.authenticate = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized operation' });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decode.userId;
        next();

    } catch (error) {
        res.status(401).json({ message: '[*] {authenticate} Error exception Unauthorized' });
    }
}
