const express = require('express');
const cors = require('cors');

const emailValidator = require('deep-email-validator');

async function isEmailValid(email) {

    const result = await emailValidator.validate(email);
    console.log(result);
    if (result.valid) {
        console.log(`\n${email} e-mail cím létezik!`)
    } else {
        console.log(`\n${email} e-mail cím nem létezik!`)
    }

}


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(9000, () => console.log("Running!"));

app.get('/', (req, res) => { res.send("Email teszt") });

isEmailValid("kuruczlaszlo@taszi.hu");

