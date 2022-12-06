const mysql = require('mysql');
const db = mysql.createConnection({
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "magyarorszag_telepulesei"
})


const megyelista = (req, res) => {
    db.query("SELECT kód as megyekod, név as megyenev FROM megyek ORDER BY megyenev", (err, rows) => {
        err ?
            res.status(400).json(err)
            :
            res.status(200).json(rows);
    })
}


const megyeTelepulesei = (req, res) => {
    db.query(`SELECT t.név as nev, AVG(t.lat) "lat", AVG(t.long) "long", t.` + '`KSH kód`' + `, t.terület, t.népesség, t.lakások, m.név "megyenev", j.jogállás
FROM telepulesek t
  INNER JOIN jogallas j ON j.Súly=t.Jogállás
  INNER JOIN megyek m ON m.kód=t.megyekód
  WHERE UPPER(m.név)=UPPER('${req.params.megyenev}')
  GROUP BY t.név`, (err, rows) => {
        err ?
            res.status(400).send(err)
            :
            res.status(200).json(rows);
    })
}



module.exports = {
    megyelista,
    megyeTelepulesei
}