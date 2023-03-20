const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = new sqlite3.Database('./vizes.db');


app.get('/', (req: object, res: any) => {
    res.json({ message: "vízmérés adatbázis" });
});


app.get('/varos/:varos/keszultseg/:keszultseg', (req: any, res: any) => {
    const varos: string = req.params.varos;
    const keszultseg: string = req.params.keszultseg;

    const ksz1 = 'ksz1';
    const ksz2 = 'ksz2';
    const ksz3 = 'ksz3';

    let searchKeszultseg = null;

    switch (keszultseg) {
        case ksz1: {
            searchKeszultseg = ksz1;
            break;
        }
        case ksz2: {
            searchKeszultseg = ksz2;
            break;
        }
        case ksz3: {
            searchKeszultseg = ksz3;
            break;
        }
        case '1': {
            searchKeszultseg = ksz1;
            break;
        }
        case '2': {
            searchKeszultseg = ksz2;
            break;
        }
        case '3': {
            searchKeszultseg = ksz3;
            break;
        }

        default:
            res.json({ message: "Helytelen készültségi fok!" });
            return;
    }


    if (searchKeszultseg != null) {
        const query =
            `
                SELECT varos, ${searchKeszultseg}
                FROM vizmerce
                WHERE LOWER(varos)=LOWER('${varos}')
            `
        // console.log(query);

        db.all(
            query,
            (err: any, rows: any) => {
                if (err) res.status(400).send(err);
                else {
                    if (rows.length > 0) res.json(rows);
                    else res.json({ message: 'Nincs ilyen adat' });
                }
            }
        );
    }

});


app.get('/vizallas/:varos', (req: any, res: any) => {
    const varos = req.params.varos;

    db.all(
        `
            SELECT v.varos, m.nap, m.ido, m.vizAllas
            FROM vizmerce v
            JOIN meres m ON (v.id=m.vmId)
            WHERE LOWER(v.varos)=LOWER('${varos}')
        `,
        (err: any, rows: any) => {
            if (err) res.status(400).send(err);
            else {
                if (rows.length > 0) res.json(rows);
                else res.json({ message: 'Nincs ilyen adat' });
            }
        }
    );

});


app.post('/ujvizallas', async (req: any, res: any) => {
    const { varos, nap, ido, vizAllas } = req.body;

    //  példa
    //  {
    //     "varos": "tiszabecs",
    //     "nap": "2023-03-20",
    //     "ido": "15:00",
    //     "vizAllas": 300
    //  }

    let id: any = null;
    let vmId: any = null;

    //  Id
    const getId = (db: any) => {
        return new Promise((resolve, reject) => {
            db.all(
                `
                SELECT MAX(id)+1 id
                FROM meres
            `,
                (err: any, rows: any) => {
                    if (err) reject(err);
                    else {
                        if (rows.length > 0) resolve(rows[0].id);
                        else res.status(400).json({ message: "Id generálás elhasalt" });
                    }
                }
            );
        })
    }

    id = await getId(db);


    //  Település id
    const getVarosId = (db: any, varos: any) => {
        return new Promise((resolve, reject) => {
            db.all(
                `
            SELECT DISTINCT v.id
            FROM vizmerce v
            JOIN meres m ON (v.id=m.vmId)
            WHERE LOWER(v.varos)=LOWER('${varos}');
        `,
                (err: any, rows: any) => {
                    if (err) reject(err);
                    else {
                        if (rows.length > 0) resolve(rows[0].id);
                        else res.status(400).json({ message: "Adatbázisban nem szereplő települést adott meg! (neve kell, nem azonosító)" });
                    }
                }
            );
        })
    }

    vmId = await getVarosId(db, varos);

    if (id == null || vmId == null) return;
    else {
        db.run(
            `
                INSERT INTO meres (id, vmId, nap, ido, vizAllas)
                VALUES (${id}, ${vmId}, "${nap}", "${ido}", ${vizAllas})
            `,
            (err: any) => {
                if (err) res.status(400).send(err);
                else res.status(201).json({ message: "Sikeres adatfelvitel!" });
            }
        )

    }


});







app.listen(process.env.PORT || 8000, () => console.log("Running!"));