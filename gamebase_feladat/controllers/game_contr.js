const mysql = require('mysql');
const db = mysql.createConnection({
    host: process.env.API_HOST,
    user: process.env.API_USER,
    password: process.env.API_PASSWORD,
    database: "gamebase"
})


const getGames = (req, res) => {
    db.query("SELECT * FROM games", (err, rows) => {
        err ?
            res.status(400).send(err)
            :
            res.json(rows);
    })
}

const postGames = (req, res) => {
    const { jateknev, kategoria, kiadas_eve, platform, kiado } = req.body;
    db.query(`INSERT INTO games (jateknev, kategoria, kiadas_eve, platform, kiado) values( '${jateknev}', '${kategoria}', ${kiadas_eve}, '${platform}', '${kiado}' )`, (err, rows) => {
        err ?
            res.status(400).send(err)
            :
            res.json(rows);
    })
}

const patchGames = (req, res) => {
    const { jateknev, kategoria, kiadas_eve, platform, kiado } = req.body;
    db.query(`UPDATE games SET jateknev='${jateknev}', kategoria='${kategoria}', kiadas_eve=${kiadas_eve}, platform='${platform}', kiado='${kiado}' WHERE id=${req.params.id}`, (err, rows) => {
        err ?
            res.status(400).send(err)
            :
            res.json(rows);
    })
}

const deleteGames = (req, res) => {
    db.query(`DELETE FROM games WHERE id=${req.params.id}`, (err, rows) => {
        err ?
            res.status(400).send(err)
            :
            res.json(rows);
    })
}


module.exports={
    getGames,
    postGames,
    patchGames,
    deleteGames
}