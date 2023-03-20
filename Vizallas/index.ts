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
                if (err) res.send(err);
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
            if (err) res.send(err);
            else {
                if (rows.length > 0) res.json(rows);
                else res.json({ message: 'Nincs ilyen adat' });
            }
        }
    );

});


app.post('/ujvizallas', (req: any, res: any) => {
    const { varos, nap, ido, vizAllas } = req.body;

    var id: any = null;
    var vmId: any = null;

    //  Id
    db.all(
        `
            SELECT MAX(id) id
            FROM meres
        `,
        (err: any, rows: any) => {
            if (err) res.send(err);
            else {
                if (rows.length > 0) id = rows[0].id;
                else res.json({ message: "Id generálás elhasalt" });
            }
        }
    );



    //  Település
    db.all(
        `
            SELECT DISTINCT v.id
            FROM vizmerce v
            JOIN meres m ON (v.id=m.vmId)
            WHERE LOWER(v.varos)=LOWER('${varos}');
        `,
        (err: any, rows: any) => {
            if (err) res.send(err);
            else {
                if (rows.length > 0) vmId = rows[0].id;
                else res.json({ message: "Adatbázisban nem szereplő települést adott meg! (neve kell, nem azonosító)" });
            }
        }
    );

    if (id == null || vmId == null) return;
    else {
        db.run(
            `
            
            `
        )

    }


});







app.listen(process.env.PORT || 8000, () => console.log("Running!"));