const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');
const { validationResult } = require('express-validator');

module.exports = {
    register: async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            let errs = {};
            result.errors.forEach(err => {
                errs[err.param] = err.msg;
            });
            return res.status(400).json({ errors: errs });
        }
        try {
            const { userName, email, password } = req.body;
            const newUser = User({ userName, email, password });
            await newUser.save(err => {
                if (err) return res.status(400).json({ errors: {email: err} });
                jwt.sign({ sub: newUser.id }, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                });
            });
        } catch (err) {
            return res.status(400).json({ errors: {msg: err} });
        }
    },
    login: async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            let errs = {};
            result.errors.forEach(err => {
                errs[err.param] = err.msg;
            });
            return res.status(400).json({ errors: errs });
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({errors: {msg: "Invalid Credentials"}});
        }
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            return res.status(400).json({errors: {msg: "Invalid Credentials"}});
        }
        jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    }
}