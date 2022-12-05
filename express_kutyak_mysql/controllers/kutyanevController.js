const mysql= require('mysql');

const conn=mysql.createConnection({
    "host":"localhost",
    "user":"root",
    "password":"",
    "database":"kutyak"
});

const getKutyanevek=(req,res)=>{
    conn.query("select * from kutyanevek",(err,rows)=>{
        if(err){
            res.status(400).send(err);
        } else {
            res.json(rows);
        }

    });
}
const postKutyanev=(req,res)=>{
   
    conn.query("insert into kutyanevek (kutyanev) values(?)"
    ,[req.body.kutyanev]
    ,(err,result)=>{
        if(err){
            res.status(400).send(err);
        } else {
            res.status(201).json({message:"Érintett sorok:"+result.affectedRows+" Id:"+result.insertId})
        }

    })
}

const patchKutyanev=(req,res)=>{
    const {id,kutyanev}=req.body;
    conn.query("update kutyanevek set kutyanev=? where id=?"
    ,[kutyanev,id]
    ,(err,result)=>{
        if(err){
            res.status(400).send(err);
        } else {
            res.status(200).json({message:"Érintett sorok:"+result.affectedRows+" Id:"+result.insertId})
        }

    })
}

const deleteKutyanev=(req,res)=>{
    conn.query("delete from kutyanevek where id=?"
    ,[req.body.id]
    ,(err,result)=>{
        if(err){
            res.status(400).send(err);
        } else {
            res.status(200).json({message:"Érintett sorok:"+result.affectedRows+" Id:"+result.insertId})
        }

    })
}

module.exports={
    getKutyanevek,
    postKutyanev,
    patchKutyanev,
    deleteKutyanev
}