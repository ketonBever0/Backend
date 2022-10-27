const sqlite3 = require('sqlite3');
const db=new sqlite3.Database('./kutyak.db')

const getKutyanevek=(req,res)=>{
    // res.json({message:"Kutyanevek lekérése"})
    db.all('select * from kutyanevek',(err,rows)=>{
        if(err){
            res.send(err);
        }else{
            res.json(rows)
        }
    })
}

const postKutyanevek=(req,res)=>{
    // res.json({message:"Kutyanév hozzáadása"})
    db.run('insert into kutyanevek (id,kutyanev) values(?,?)',[req.body.id,req.body.kutyanev],(err)=>{
        if(err){
            res.send(err)
        }else{
            res.json({message:"Adat beszúrva!"})
        }
    })
}

const patchKutyanevek=(req,res)=>{
    // res.json({message:"Kutyanév módosítása"})
    db.run('update kutyanevek set kutyanev=? where id=?',[req.body.kutyanev,req.body.id],(err)=>{
        if(err){
            res.send(err)
        }else{
            res.json({message:"Adat módosítva!"})
        }
    })
}

const deleteKutyanevek=(req,res)=>{
    // res.json({message:"Kutyanév törlése"})
    db.run('delete from kutyanevek where id=?',[req.body.id],(err)=>{
        if(err){
            res.send(err)
        }else{
            res.json({message:"Adat törölve!"})
        }
    })
}

module.exports={
    getKutyanevek,
    postKutyanevek,
    patchKutyanevek,
    deleteKutyanevek
}