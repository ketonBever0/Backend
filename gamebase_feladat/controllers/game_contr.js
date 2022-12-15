const mysql = require('mysql');
const db = mysql.createConnection({
    host: process.env.API_HOST,
    user: process.env.API_USER,
    password: process.env.API_PASSWORD,
    database: process.env.API_DATABASE
})


const getGames = (req, res) => {
    db.query("SELECT * FROM games", (err, rows) => {
        err ?
            res.status(400).send(err)
            :
            res.json(rows);
    })
}

const postGame = (req, res) => {
    const { jateknev, kategoria, kiadas_eve, platform, kiado } = req.body;
    db.query(`INSERT INTO games (jateknev, kategoria, kiadas_eve, platform, kiado) values( '${jateknev}', '${kategoria}', ${kiadas_eve}, '${platform}', '${kiado}' )`, (err, rows) => {
        err ?
            res.status(400).send(err)
            :
            res.json({ message: "Adat hozzáadva!" });
    })
}

const patchGameById = (req, res) => {
    const { jateknev, kategoria, kiadas_eve, platform, kiado } = req.body;
    db.query(`UPDATE games SET jateknev='${jateknev}', kategoria='${kategoria}', kiadas_eve=${kiadas_eve}, platform='${platform}', kiado='${kiado}' WHERE id=${req.params.id}`, (err, rows) => {
        err ?
            res.status(400).send(err)
            :
            rows.affectedRows > 0 ?
                res.json({ message: "Adat módosult!" })
                :
                res.status(404).json({ message: "Adat nem található!" });
    })
}

//  POST és PATCH minta
//  {"jateknev":"Team Fortress 2","kategoria":"FPS","kiadas_eve":2007,"platform":"Windows","kiado":"Valve"}
//  {"jateknev":"League of Legends","kategoria":"MOBA","kiadas_eve":2009,"platform":"Windows","kiado":"Riot Games"}
//  {"jateknev":"Rocket League","kategoria":"Sports","kiadas_eve":2015,"platform":"Windows","kiado":"Psyonix"}


const deleteGameById = (req, res) => {
    db.query(`DELETE FROM games WHERE id=${req.params.id}`, (err, rows) => {
        err ?
            res.status(400).send(err)
            :
            rows.affectedRows > 0 ?
                res.json({ message: "Adat törölve!" })
                :
                res.status(404).json({ message: "Adat nem található!" });
    })
}


module.exports = {
    getGames,
    postGame,
    patchGameById,
    deleteGameById
}