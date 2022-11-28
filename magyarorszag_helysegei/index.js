const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(8000,()=>console.log("Server started!"));

app.get('/',(req, res)=>res.send("Magyarország települései API"))

const controller = require('./controller');


app.get('/telepulesek',controller.getTelepulesek);


app.get('/koordinata/:telepulesnev',controller.getKoordinataByTelepulesnev);

app.get('/iranyitoszam/:telepulesnev',controller.getIrszamByTelepulesnev);







