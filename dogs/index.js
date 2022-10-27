const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const dbfunc = require('./db_repo');

const db = new sqlite3.Database("./kutyak.db")


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.listen(8000,()=>{console.log("Fut a szerver!")});

app.get('/', (req, res)=>{
    res.send("<h2>Állatorvosi rendelő</h2>");
})

app.get('/rendeles',(req,res)=>{
    dbfunc.getRendeles(db)
    .then(res=>res.json())
    .then(adatok=>res.send(adatok))
    .catch(err=>res.send(err));
})

// kutyanev

app.get('/kutyanevek', (req, res)=>{
    dbfunc.getKutyanevek(db)
    .then(res=>res.json())
    .then(adatok=>res.send(adatok))
    .catch(err=>res.send(err));
})

app.post('/addkutyanevek',(req, res)=>{
    dbfunc.addKutyanevek(db,req.body)
    .then(res=>res.json())
    .catch(err=>res.send(err));
})

app.patch('/updatekutyanevek', (req, res)=>{
    dbfunc.updateKutyanevek(db,req.body)
    .then(res=>res.json())
    .catch(err=>res.send(err));
})


app.delete('/deletekutyanevek', (req, res)=>{
    dbfunc.deleteKutyanevek(db,req.body)
    .then(res=>res.json())
    .catch(err=>res.send(err))
})



