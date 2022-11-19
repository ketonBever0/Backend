const All=(db)=>{
    return new Promise((reject,resolve)=>{
        db.all("select * from autok",(error,rows)=>{
            if(error){
                reject(error)
            }
            else{
                if(rows.length>0){
                    resolve(rows);
                }
                else{
                    resolve({message:"Nincs ilyen adat!"});
                }
                
            }
            
        });
    })
}



const ujAuto=(db,{rendszam,marka,tipus,szin,gyartasiev})=>{
    return new Promise((reject,resolve)=>{
        db.run("insert into autok values(?,?,?,?,?)",[rendszam,marka,tipus,szin,gyartasiev],error=>{
            error?
            reject({message:error})
            :
            resolve({message:"Új adat beszúrva!"})
        });
    })
}


const update=(db,{rendszam,marka,tipus,szin,gyartasiev})=>{
    return new Promise((reject,resolve)=>{
        db.run('update autok set marka=?, tipus=?, szin=?, gyartasiev=? where rendszam=?',[marka,tipus,szin,gyartasiev,rendszam],error=>{
            error?
            reject({message:error})
            :
            resolve({message:"Adat változtatva!"})
        })
    })
}



const remove=(db,{rendszam})=>{
    return new Promise((reject,resolve)=>{
        db.run("delete from autok where rendszam=?",[rendszam],error=>{
            error?
            reject({message:error})
            :
            resolve({message:"Adat törölve!"})
        })
    })
}


const getAutoMarka=(db,marka)=>{
    return new Promise((reject,resolve)=>{
        db.all("select * from autok where lower(marka)=lower(?)",[marka],(error,rows)=>{
            if(error){
                reject({message:error})
            }
            else{
                if(rows.length>0){
                    resolve(rows);
                }
                else{
                    resolve({message:"Nincs ilyen adat!"});
                }
                
            }
            
        });
    })
}

const getGyartasiEv=(db,gyartasiev)=>{
    return new Promise((reject,resolve)=>{
        db.all("select * from autok where gyartasiev=?",[gyartasiev],(error,rows)=>{
            error?
            reject({message:error})
            :
            rows.length>0?
                resolve(rows)
                :
                resolve({message:"Nincs ilyen adat!"})
        })
    })
}


const getMarkaTipus=(db,marka,tipus)=>{
    return new Promise((reject,resolve)=>{
        db.all("select * from autok where marka=? and tipus=?",[marka,tipus],(error,rows)=>{
            error?
            reject({message:error})
            :
            rows.length>0?
                resolve(rows)
                :
                resolve({message:"Nincs ilyen adat!"})
        })
    })
}







module.exports={
    All,
    ujAuto,
    update,
    remove,
    getAutoMarka,
    getGyartasiEv,
    getMarkaTipus
}