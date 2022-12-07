const mysql = require('mysql');
const db = mysql.createConnection({
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "magyarorszag_telepulesei"
})


const jogallasLista = (req, res) => {
    db.query('SELECT CONCAT(SUBSTR(UPPER(Jogállás),1,1), SUBSTR(Jogállás,2,LENGTH(Jogállás))) "jogallas" from jogallas', (err, rows) => {
        err ?
            res.status(400).json(err)
            :
            res.status(200).json(rows);
    });
}


const jogallasTelepulesei=(req,res)=>{
    db.query(`SELECT t.név as nev, AVG(t.lat) "lat", AVG(t.long) "long", t.` + '`KSH kód`' + `, t.terület, t.népesség, t.lakások, m.név "megyenev", j.jogállás
    FROM telepulesek t
      INNER JOIN jogallas j ON j.Súly=t.Jogállás
      INNER JOIN megyek m ON m.kód=t.megyekód
      WHERE UPPER(j.jogállás)=UPPER('${req.params.jogallas}')
      GROUP BY t.név`,(err,rows)=>{
        err ?
            res.status(400).json(err)
            :
            res.status(200).json(rows);
    });
}


module.exports = {
    jogallasLista,
    jogallasTelepulesei
}