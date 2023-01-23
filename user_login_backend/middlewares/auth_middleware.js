const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const idFromToken = jwt.verify(token, proces.env.JWR_SECRET);
            req.user = await User.findById(idFromToken.id).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Be kell jelentkezni!");
        }


    }

    if (!token) {
        res.status(401);
        throw new Error("Be kell jelentkezni!");

    }
})

module.exports = protect;