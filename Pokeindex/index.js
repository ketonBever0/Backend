const express=require('express');
const cors=require('cors');
const fetch=require('cross-fetch');





// Töltsük le a fájlt és szolgáljuk ki, lehessen is kiszűrni


async function run(){

    const app=express();
    app.use(cors());


    const response=await fetch("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json");
    const pokeData=await response.json();
    app.get('/',(req,res)=>{
        res.json(pokeData)
    })
    
    
    app.listen(8000,()=>{
        console.log("Server is running");
    })



    // ID szerint keresse ki az adatot!


var id=3;

app.get('/'+id,(req,res)=>{
    let szurt=pokeData.pokemon.filter(x=>x.id==id);
    res.json(szurt);
})




}





run();
