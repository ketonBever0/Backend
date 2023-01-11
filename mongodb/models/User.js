const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLegth: 6,
        required: [true, 'Adjon meg felhasználónevet!'],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        minLegth: 8,
        required: [true, 'Adjon meg legalább 8 karakter hosszúságú jelszót!']
    },
    email: {
        type: String,
        minLegth: 6,
        required: [true, 'Adja meg az e-mail címét!'],
        lowercase: true,
        unique: true
    },
    age: {
        type: Number,
        min: 12,
        max: 150
    }
});

module.exports = mongoose.model('Users', userSchema);