const express = require('express');
const cors = require('cors');
const app = express();
const controller = require('./controller/telepules_controller');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(8000,()=>console.log("Server started!"));

app.get('/',(req, res)=>res.send("Magyarország települései API"))




app.use('/api/telepulesek', require('./routes/telepules_routes'))

app.use('/api/megyek', require('./routes/megye_routes'))



//  volt feladat
app.get('/koordinata/:telepulesnev',controller.getKoordinataByTelepulesnev);

app.get('/iranyitoszam/:telepulesnev',controller.getIrszamByTelepulesnev);







