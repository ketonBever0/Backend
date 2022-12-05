const mysql = require('mysql');
const db = mysql.createConnection({
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "magyarorszag_telepulesei"
})



const getTelepulesek = (req, res) => {
    db.query(`SELECT t.név, AVG(t.lat) "lat", AVG(t.long) "long", t.` + '`KSH kód`' + `, t.terület, t.népesség, t.lakások, m.név "megyenév", j.jogállás
    FROM telepulesek t
      INNER JOIN jogallas j ON j.Súly=t.Jogállás
      INNER JOIN megyek m ON m.kód=t.megyekód
      GROUP BY t.név`, (err, rows) => {
        err ?
            res.status(400).send(err)
            :
            res.json(rows);
    })
}


const getTelepulesByName = (req, res) => {
    db.query(`SELECT t.név as nev, AVG(t.lat) "lat", AVG(t.long) "long", t.` + '`KSH kód`' + `, t.terület, t.népesség, t.lakások, m.név "megyenév", j.jogállás
    FROM telepulesek t
      INNER JOIN jogallas j ON j.Súly=t.Jogállás
      INNER JOIN megyek m ON m.kód=t.megyekód
      WHERE UPPER(t.név)=UPPER('${req.params.nev}')`
        , (err, rows) => {
            err ?
                res.status(400).send(err)
                :
                rows[0].nev != null ?
                    res.json(rows[0])
                    :
                    res.status(404).json({ message: "Nincs ilyen település." });
        })
}


const getKoordinataByTelepulesnev = (req, res) => {
    db.query(`SELECT t.Név "nev", t.Long, t.Lat FROM telepulesek t WHERE UPPER(t.Név) LIKE UPPER('%${req.params.telepulesnev}%')`, (err, rows) => {
        err ?
            res.status(400).send(err)
            :
            res.json(rows)
    })
}

const getIrszamByTelepulesnev = (req, res) => {
    db.query("SELECT Név, `Ir. szám`" + ` FROM telepulesek WHERE UPPER(Név) LIKE UPPER('%${req.params.telepulesnev}%')`, (err, rows) => {
        err ?
            res.status(400).send(err)
            :
            res.json(rows);
    })
}



module.exports = {
    getTelepulesek,
    getTelepulesByName,
    getKoordinataByTelepulesnev,
    getIrszamByTelepulesnev
}