const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connect = () => {
    mongoose.connect(process.env.CONNECT,
        (e) => {
            e?
            console.log(e)
            :
            console.log("Connected!");
        });
}



module.exports = { connect };