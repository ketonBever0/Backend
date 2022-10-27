// "/rendeles" végpont

const getRendeles=(db)=>{
    return new Promise((reject, resolve)=>{
        db.all("select kutyanevek.kutyanev as Név,kutyafajtak.nev as Fajta,kutya.eletkor as Életkor,kutya.utolsoell 'Utolsó vizsgálat' from kutya join kutyanevek on kutya.nevid=kutyanevek.Id join kutyafajtak on kutya.fajtaid=kutyafajtak.id",(error,rows)=>{
            if(error){
                reject(error);
            }
            else{
                if(rows.length>0){
                    resolve(rows)
                }
                else{
                    resolve({message: "Nincs ilyen adat!"})
                }
            }
        })
    })
}

// kutyanev

const getKutyanevek=(db)=>{
    return new Promise((reject,resolve)=>{
        db.all('select * from kutyanevek',(error,rows)=>{
            error?
                reject(error)
                :
                rows.length>0?
                    resolve(rows)
                :
                    resolve({message: "Nincs ilyen adat!"})
        })
    })
}

const addKutyanevek=(db,{id,kutyanev})=>{
    return new Promise((reject,resolve)=>{
        db.run("insert into kutyanevek values(?,?)",[id,kutyanev],error=>{
            error?
                reject({message:error})
            :
                resolve({message:"Új adat beszúrva!"})
        })
    })
}

const updateKutyanevek=(db,{id,kutyanev})=>{
    return new Promise((reject,resolve)=>{
        db.run('update kutyanevek set kutyanev=? where id=?',[kutyanev,id],error=>{
            error?
                reject({message:error})
            :
                resolve({message:"Adat módosítva!"})
        })
    })
}


const deleteKutyanevek=(db,{id})=>{
    return new Promise((reject,resolve)=>{
        db.run("delete from kutyanevek where id=?",[id],error=>{
            error?
                reject({message:error})
            :
                resolve({message:"Adat törölve!"})
        })
    })
}










module.exports={
    getRendeles,
    getKutyanevek,
    addKutyanevek,
    deleteKutyanevek,
    updateKutyanevek
}