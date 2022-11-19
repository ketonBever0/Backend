const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database("./autok.db");

const {All}=require("./db_repo.js");
const {getAutoMarka}=require("./db_repo.js");
const dbfunc=require("./db_repo");


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.listen(8000,()=>{console.log("Server started!")});


app.get("/",(req,res)=>{
    // res.send("<h2>Autó API</2>");
    var str="<h2>Autó API</h2>"
    db.all("select * from autok",(error,rows)=>{
        if(error){
            str+=error
        }else{
            str+=`<p>Jelenleg ${rows.length} járművet tárolunk.</p>`
        }
        res.send(str)
    })
    
    
    

})


app.get("/all",(req,res)=>{
    db.all("select * from autok",(error,rows)=>{
        if(error){
            res.send(error)
        }
        else{
            if(rows.length>0){
                res.json(rows);
            }
            else{
                res.json({message:"Nincs ilyen adat!"});
            }
            
        }
        
    });
});


app.get("/all2",(req,res)=>{
    All(db)
    .then(res=>res.json())
    .then(adatok=>res.json(adatok))
    .catch(err=>res.send(err))
})



app.get("/all3", async (req,res)=>{
    try{
        const response=await All(db);
        const data=await response.json();

        res.json(data);
    }
    catch(error){
        res.send(err);
    }
})



app.post("/ujauto",(req,res)=>{
    console.log(req.body);
    dbfunc.ujAuto(db,req.body).then(res=>res.json()).catch(err=>res.send(err))
})



app.patch("/update",(req,res)=>{
    console.log(req.body);
    dbfunc.update(db,req.body).then(res=>res.json()).catch(err=>res.send(err))
})


app.delete("/delete",(req,res)=>{
    console.log(req.body);
    dbfunc.remove(db,req.body).then(res=>res.json()).catch(err=>res.send(err))
})


app.get("/marka/:marka",(req,res)=>{
    dbfunc.getAutoMarka(db,req.params.marka)
    .then(res=>res.json())
    .then(adatok=>res.json(adatok))
    .catch(err=>res.send(err));
})




app.get("/gyartasiev/:gyartasiev",(req,res)=>{
    dbfunc.getGyartasiEv(db,req.params.gyartasiev)
    .then(res=>res.json())
    .then(adatok=>res.json(adatok))
    .catch(err=>res.send(err))
})


app.get("/markatipus/:marka/:tipus",(req,res)=>{
    dbfunc.getMarkaTipus(db,req.params.marka,req.params.tipus)
    .then(res=>res.json())
    .then(adatok=>res.json(adatok))
    .catch(err=>res.send(err))
})


