const { application } = require('express');
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
//const db=new sqlite3.Database();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = new sqlite3.Database('./chinook.db');

app.listen(8000, () => { console.log("Running") });

app.get('/', (req, res) => {
    res.json({ message: "Backend vizsgafeladat" });
});


app.get('/artists', (req, res) => {
    db.all("SELECT * FROM artists;", (err, rows) => {
        if (err) res.status(400).json({ error: err });
        else res.json(rows);
    })
})


app.post('/artists', (req, res) => {
    db.run(
        `
        INSERT INTO artists (Name)
        VALUES (?);
        `, [req.body.Name],
        (err) => {
            if (err) res.status(400).json({ error: err });
            else res.status(201).json({ message: `${req.body.Name} előadó hozzáadva` });
        })
})


app.get('/genre-tracks/:category', (req, res) => {
    db.all(
        `
        SELECT t.Name
        FROM tracks t
        JOIN genres g ON t.GenreId=g.GenreId
        WHERE LOWER(g.Name)=LOWER(?);
        `,
        [req.params.category],
        (err, rows) => {
            if (err) res.status(400).json({ error: err });
            else res.json(rows);
        })
})



