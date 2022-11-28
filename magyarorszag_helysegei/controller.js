const mysql = require('mysql');
const db = mysql.createConnection({
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "magyarorszag_telepulesei"
})



const getTelepulesek = (req, res) => {
    db.query("SELECT DISTINCT Név FROM telepulesek", (err, rows) => {
        err ?
            res.status(400).send(err)
            :
            res.json(rows);
    })
}

const getKoordinataByTelepulesnev=(req, res) => {
    db.query(`SELECT t.Long, t.Lat FROM telepulesek t WHERE UPPER(t.Név) LIKE UPPER('%${req.params.telepulesnev}%')`, (err, rows) => {
        err ?
            res.status(400).send(err)
            :
            res.json(rows);
    })
}

const getIrszamByTelepulesnev=(req, res) => {
    db.query("SELECT `Ir. szám`"+` FROM telepulesek WHERE UPPER(Név) LIKE UPPER('%${req.params.telepulesnev}%')`, (err, rows) => {
        err ?
            res.status(400).send(err)
            :
            res.json(rows);
    })
}



module.exports = {
    getTelepulesek,
    getKoordinataByTelepulesnev,
    getIrszamByTelepulesnev
}