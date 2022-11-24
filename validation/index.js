const express = require('express');
const cors = require('cors');
const app = express();
const { check, body, validationResult } = require('express-validator');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(8000, () => {
    console.log("Running!")
})

app.get('/', (req, res) => {
    res.send("Adatok ellenőrzése")
})



app.post('/reg',
    check('username').isLength({ min: 3, max: 20 }).withMessage("3 és 20 közötti hosszúságú karakter lehet").trim().escape(),
    body("e-mail").isEmail().withMessage("Rossz e-mail formátum!"),
    body('password').isLength({ min: 6, max: 20 }).withMessage("6 és 20 közötti hosszúságú karakter lehet").escape(),
    body('teljes név').isLength({ min: 7 }).withMessage("legalább 6 karakter").trim().escape(),
    body('születési dátum').isDate().withMessage("Dátum"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ Errors: errors.array() })
        } else {
            console.log(req.body);
            res.send("Sikeres adatfelvitel!")
        }
    })


app.post('/blog',
    check('Név').isLength({min:6,max:20}).withMessage("6 és 20 közötti hosszúságú karakter lehet a neved.").trim().escape(),
    body('Szöveg').isLength({min:20,max:200}).withMessage("20 és 200 karakteres lehet a hozzászólásod."),
    (req,res)=>{
        const errors=validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ Errors: errors.array() })
        } else {
            console.log(req.body);
            res.send("Köszönjük a hozzászólást!")
        }
    }

)






