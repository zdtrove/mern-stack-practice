const HttpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');

const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ errors: { msg: 'No token, access denied' }});
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.sub;
        next();
    } catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ errors: { msg: "Server Error" }});
    }
}

module.exports = auth;