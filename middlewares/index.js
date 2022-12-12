const express = require('express');
const cors = require('cors');
const app = express();

const dotenv = require('dotenv').config();

const { logger } = require('./logger');
const { sqllog } = require('./sqllog');


const asyncHandler = require('express-async-handler');
const {errHandler}=require('./error_middleware');



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);
app.use(sqllog);
app.use(errHandler);


app.listen(process.env.PORT, () => console.log("Running!"));

app.get('/', (req, res) => res.send("Middlewares API"));



app.get('/szam/:szam', asyncHandler(async (req, res) => {

    if(req.params.szam > 10){
        throw new Error(`${req.params.szam} - Nem megfelelő szám!`);
    }
    res.json({szam:req.params.szam});
        
}))



app.post('/post', (req, res) => {
    res.send("Post");
})


