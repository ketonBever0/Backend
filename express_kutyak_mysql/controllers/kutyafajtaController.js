const mysql= require('mysql');
const conn=mysql.createConnection({
    "host":"localhost",
    "user":"root",
    "password":"",
    "database":"kutyak"
});

const getKutyafajtak=(req,res)=>{
    conn.query("select * from kutyafajtak",(err,rows)=>{
        if(err){
            res.status(400).send(err);
        } else {
            res.status(200).json(rows);
        }
    })
}

const postKutyafajta=(req,res)=>{
    const {nev,eredetinev}=req.body;
    conn.query("insert into kutyafajtak (nev,eredetinev) values(?,?)"
    ,[nev,eredetinev]
    ,(err,result)=>{
        if(err){
            res.status(400).send(err);
        } else {
            res.status(201).json({message:"Beszúrva:"+result.affectedRows+" sor."});
        }
    });
}

const patchKutyafajta=(req,res)=>{
    const {id,nev,eredetinev}=req.body;
    conn.query("update kutyafajtak set nev=?,eredetinev=? where id=?"
    ,[nev,eredetinev,id]
    ,(err,result)=>{
        if(err){
            res.status(400).send(err);
        } else {
            res.status(200).json({message:"Módosítva:"+result.affectedRows+" sor."});
        }

    })
}
const deleteKutyafajta=(req,res)=>{
    const{id}=req.body;
    conn.query("delete from kutyafajtak where id=?"
    ,[id]
    ,(err,result)=>{
        if(err){
            res.status(400).send(err);
        } else {
            res.status(200).json({message:"Törölve:"+result.affectedRows+" sor."});
        }

    })
}

module.exports={
    getKutyafajtak,
    postKutyafajta,
    patchKutyafajta,
    deleteKutyafajta
}