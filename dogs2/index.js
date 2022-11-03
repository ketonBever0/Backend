const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/rendelo',require('./routes/kutyanev_routes'))
app.use('/api/rendelo',require('./routes/kutyafajtak_routes'))


app.listen(8000,()=>{console.log('Fut a szerver!')})


app.get('/',(req,res) => {
    res.send('<h2>Állatorvosi rendelő</h2>')
})



