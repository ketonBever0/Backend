const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(9000, () => console.log("Test server running!"));


app.get('/', (req, res) => res.send("<h2>Testing Backend</h2>"));


let testData = [
    {
        id: 1,
        data: "text1"
    },
    {
        id: 2,
        data: "text2"
    },
    {
        id: 3,
        data: "text3"
    }
]


app.get('/data', (req, res) => {
    res.json(testData);
})


app.post('/new', (req, res) => {
    testData.push(req.body);
    res.status(201).json({ message: 'New data inserted!' });
})

app.delete('/delete', (req, res) => {
    id = req.body.id;
    testData = testData.filter(x => x.id != id)
    res.status(201).json({ message: 'Data deleted!' });
    // res.status(201).json(req.body);
})


