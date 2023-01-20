const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv').config();
const {errorHandler}=require('./middlewares/error_middleware');
const asyncHandler=require('express-async-handler');
const {connect} = require('./db');


const bcrypt=require('bcryptjs');

const User=require('./models/User');

const app=express();


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(errorHandler);
app.use('/api/user',require('./routes/userR'));


connect();



app.listen(process.env.PORT,()=>console.log("Running!"));

app.get('/',(req,res)=>res.send("<h2>Login API</h2>"));


