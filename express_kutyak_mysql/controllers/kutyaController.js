const mysql= require('mysql');
const conn=mysql.createConnection({
    "host":"localhost",
    "user":"root",
    "password":"",
    "database":"kutyak"
});

const getKutyak=(req,res)=>{
    conn.query("SELECT kutyak.id,fajtaid,nev,kutyanev, nevid, eletkor, utolsoell FROM kutyak,kutyanevek,kutyafajtak WHERE kutyak.nevid=kutyanevek.id and kutyak.fajtaid=kutyafajtak.id ORDER BY kutyak.id",(err,rows)=>{
        if(err){
            res.status(400).send(err);
        } else {
            res.json(rows);
        }
    })
}

const getKutyakByName=(req,res)=>{
    const searchName=req.params.searchname;
    conn.query("SELECT kutyak.id,fajtaid,nev,kutyanev, nevid, eletkor, utolsoell FROM kutyak,kutyanevek,kutyafajtak WHERE kutyak.nevid=kutyanevek.id AND kutyak.fajtaid=kutyafajtak.id AND kutyanevek.kutyanev=? ORDER BY kutyak.id",
    [searchName],(err,rows)=>{
        if(err){
            res.status(400).send(err);
        } else {
            res.json(rows);
        }
    })
}

const getKutyakByBreed=(req,res)=>{
    const searchBreed=req.params.searchbreed;
    conn.query(`SELECT kutyak.id,fajtaid,nev,kutyanev, nevid, eletkor, utolsoell FROM kutyak,kutyanevek,kutyafajtak WHERE kutyak.nevid=kutyanevek.id AND kutyak.fajtaid=kutyafajtak.id AND kutyafajtak.nev LIKE '%${searchBreed}%' ORDER BY kutyak.id`,
    (err,rows)=>{
        if(err){
            res.status(400).send(err);
        } else {
            res.json(rows);
        }
    })
}

const getKutyakByAge=(req,res)=>{
    const searchMinAge=req.params.searchminage;
    const searchMaxAge=req.params.searchmaxage;
    conn.query(`SELECT kutyak.id,fajtaid,nev,kutyanev, nevid, eletkor, utolsoell FROM kutyak,kutyanevek,kutyafajtak WHERE kutyak.nevid=kutyanevek.id AND kutyak.fajtaid=kutyafajtak.id AND kutyak.eletkor BETWEEN ${searchMinAge} AND ${searchMaxAge} ORDER BY kutyak.id`,
    (err,rows)=>{
        if(err){
            res.status(400).send(err);
        } else {
            res.json(rows);
        }
    })
}


const postKutyak=(req,res)=>{
    const {nevid,fajtaid,eletkor,utolsoell}=req.body;
    conn.query("INSERT INTO kutyak (nevid,fajtaid,eletkor,utolsoell) values(?,?,?,?)"
    ,[nevid,fajtaid,eletkor,utolsoell]
    ,(err,result)=>{
        if(err){
            res.status(400).send(err);
        } else {
            res.status(201).json({message:"Adat beszúrva!"+result.affectedRows});
        }
    })
}

const patchKutyak=(req,res)=>{
    const {id,nevid,fajtaid,eletkor,utolsoell}=req.body;
    conn.query("UPDATE kutyak SET nevid=?,fajtaid=?,eletkor=?,utolsoell=? WHERE id=?"
    ,[nevid,fajtaid,eletkor,utolsoell,id]
    ,(err,result)=>{
        if(err){
            res.status(400).send(err);
        } else {
            res.json({message:"Adat módosítva!"+result.affectedRows});
        }
    })
}

const deleteKutyak=(req,res)=>{
    const {id}=req.body;
    conn.query("DELETE FROM kutyak WHERE id=?"
    ,[id]
    ,(err,result)=>{
        if(err){
            res.status(400).send(err);
        } else {
            res.json({message:"Adat törölve!"+result.affectedRows});
        }
    })
}

module.exports={
    getKutyak,
    getKutyakByName,
    getKutyakByBreed,
    getKutyakByAge,
    
    postKutyak,
    patchKutyak,
    deleteKutyak
}

//SELECT kutyak.id,fajtaid,nev,kutyanev, nevid, eletkor, utolsoell FROM kutyak,kutyanevek,kutyafajtak WHERE kutyak.nevid=kutyanevek.id and kutyak.fajtaid=kutyafajtak.id 