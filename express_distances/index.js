//      Csak saját APIval működik

const express = require('express');
const cors = require('cors');
const app = express();

const fetch = require('cross-fetch');


const run = async () => {

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));


    app.listen(8000, () => console.log("Running!"));

    app.get("/", (req, res) => res.send("Distance API"));

    let distance = "";


    try {
        const response = await fetch("https://www.distance24.org/route.json?stops=Sopron|Szeged");
        distance = await response.json();
        const stop0 = distance.stops[0].city;
        const stop1 = distance.stops[1].city;
    }
    catch {
        distance = { error: "Nem jó az api a gyászba vele... xd" };
    }


    app.get("/api", (req, res) => {
        try {
            res.json(distance);
        }
        catch {
            res.send(`<h1>${distance}</h2>`)
        }
    });

    app.get("/distance", (req, res) => {
        res.json({
            distance: distance.distance,
            first_stop: distance.stops[0].city,
            last_stop: distance.stops[1].city
        })
    });



}
run();

