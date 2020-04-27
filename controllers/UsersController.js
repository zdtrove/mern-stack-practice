const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { validationResult } = require('express-validator');
const HttpStatus = require('http-status-codes');

module.exports = {
    loadAuth: async (req, res) => {
        try {
            const user = await User.findById(req.userId).select("-password");
            res.json(user);
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ errors: { msg: "Server Error" } });
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.userId).select("-password");
            res.json(user);
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ errors: { msg: "Server Error" } });
        }
    },
    updateUser: async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            let errs = {};
            result.errors.forEach(err => {
                errs[err.param] = err.msg;
            });
            return res.status(HttpStatus.BAD_REQUEST).json({ errors: errs });
        }
        const { userName, email, gender, role, location } = req.body;
        const updatedUser = { userName, email, gender, role, location };
        try {
            let user = await User.findById(req.params.userId);
            if (!user) {
                return res.status(HttpStatus.BAD_REQUEST).json({ msg: 'User not found' });
            }
            user = await User.findByIdAndUpdate(req.params.userId, { $set: updatedUser }, { new: true });
            res.json(user);
        } catch (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ errors: { msg: 'Server Error' } });
        }
    },
    deleteUser: async (req, res) => {
        try {
            let user = await User.findById(req.params.userId);
            if (!user) {
                return res.status(HttpStatus.BAD_REQUEST).json({errors: {msg: 'User not found'}});
            }
            await User.findByIdAndRemove(req.params.userId);
            res.json({success: {msg: 'User removed'}});
        } catch (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({errors: {msg: 'Server Error'}});
        }
    },
    getUsers: async (req, res) => {
        try {
            const users = await User.find().select("-password");
            res.json(users);
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ errors: { msg: "Server Error" } });
        }
    },
    insertUsers: async (req, res) => {
        try {
            let data = [];
            for (let i = 1; i < 100; i++) {
                data.push({
                    userName: `user${i}`,
                    email: `user${i}@gmail.com`,
                    phone: '0349998888',
                    role: "user",
                    gender: 1,
                    location: "TP HCM",
                    ability: ['doctor', 'nurse', 'developer'],
                    password: "$2b$10$KAlkWMbCT/Q3Ona0PJj6Sebkw0jFAIcpKADmwCH9bEsJ/H1SI2sXy"
                });
            }
            await User.insertMany(data);
            res.json(data);
        } catch (err) {
            console.log(err);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ errors: { msg: "Server Error" } });
        }
    },
    register: async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            let errs = {};
            result.errors.forEach(err => {
                errs[err.param] = err.msg;
            });
            return res.status(HttpStatus.BAD_REQUEST).json({ errors: errs });
        }
        try {
            const { userName, email, phone, gender, location, ability, password } = req.body;
            const newUser = User({ userName, email, phone, gender, location, ability, password });
            await newUser.save(err => {
                if (err) return res.status(HttpStatus.BAD_REQUEST).json({ errors: { email: err } });
                jwt.sign({ sub: newUser.id }, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                });
            });
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({ errors: { msg: err } });
        }
    },
    login: async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            let errs = {};
            result.errors.forEach(err => {
                errs[err.param] = err.msg;
            });
            return res.status(HttpStatus.BAD_REQUEST).json({ errors: errs });
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(HttpStatus.BAD_REQUEST).json({ errors: { msg: "Invalid Credentials" } });
        }
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            return res.status(HttpStatus.BAD_REQUEST).json({ errors: { msg: "Invalid Credentials" } });
        }
        jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    }
}