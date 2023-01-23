const express = require('express');
const r = express.Router();
const protect = require('../middlewares/auth_middleware');

const userC = require('../contr/userC');

r.post('/register', userC.register);
r.post('/login', userC.login);
r.get('/', protect, userC.getUser);
r.get('/adatmodositas', protect, userC.modifyUser)




module.exports = r;