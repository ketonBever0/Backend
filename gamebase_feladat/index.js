const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/games', require('./routes/game_router'));


app.listen(process.env.PORT, () => console.log("Running!"));

app.get('/', (req, res) => res.send("Mini Játék API"));


