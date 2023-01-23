const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');


const genToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}



const register = asyncHandler(async (req, res) => {
    // res.send("Register");

    const { username, password, email, age } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
        res.status(400);
        throw new Error("A felhasználónév foglalt!");
    }
    const e_mail = await User.findOne({ email: email });
    if (e_mail) {
        res.status(400);
        throw new Error("Ezzel az e-mail-el már regisztráltak!");
    }
    if (!username || !password || !email) {
        res.status(400);
        throw new Error("Hiányos adatok!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const ujUser = await User.create({
        username: username,
        password: hashedPassword,
        email: email,
        age: age
    });



    const token = genToken(ujUser.id);

    res.json(token);


});



const login = asyncHandler(async (req, res) => {
    // res.send("Login");
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });
    if (!user) {
        res.status(400);
        throw new Error("Nincs ilyen felhasználó!");
    }
    if (!await bcrypt.compare(password, user.password)) {
        res.status(400);
        throw new Error("Hibás jelszó!");
    }

    const token = genToken(user.id);

    res.status(200).json(token);

});



const getUser = asyncHandler(async (req, res) => {
    const user = req.user;
    res.json(user);
})


const modifyUser = asyncHandler(async (req, res) => {
    res.json({ message: "Felhasználó adatmódosítás" });
})




module.exports = {
    register,
    login,
    getUser,
    modifyUser
}