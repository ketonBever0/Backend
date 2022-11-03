const sqlite3 = require('sqlite3');
const db=new sqlite3.Database('./kutyak.db')

const getKutyafajtak=(req,res)=>{
    db.all('select * from kutyafajtak',(err,rows)=>{
        if(err){
            res.send(err)
        }else{
            res.json(rows)
        }
    })
}




module.exports={
    getKutyafajtak
    
}