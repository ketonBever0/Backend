//      Csak saját APIval működik

const express = require('express');
const cors = require('cors');
const app = express();


const run = async ()=>{

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));


    app.listen(8000, () => console.log("Running!"));

    app.get("/", (req, res) => res.send("Distance API"));



    const response=await fetch("https://www.distance24.org/route.json?stops=Sopron|Szeged");
    const distance=await response.json();




    app.get("/distance",(req,res)=>{res.json(distance)});



}
run();

