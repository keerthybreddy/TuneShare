const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = mysql.createPool({
    connectionLimit: 10,
    host : 'localhost',
    user : 'root',
    password : 'password', //place your own mysql account password
    database : 'TuneShareDB'
});

app.post('/registration-page', (req, res) => {
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const email = req.body.email;
    db.query("INSERT INTO User (username, firstName, lastName, password, email) VALUES (?, ?, ?, ?, ?)", [username, firstName, lastName, password, email], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send({username: username})
        }
    })
})

app.post('/user-login-page', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.query("SELECT * FROM User WHERE username = ? AND password = ?", [username, password], (err, result) => {
        console.log("result:", result);
        if (result.length === 0) {
            console.log('Login unsuccessful!')
            return res.send('Login unsuccessful!')
        } else {
            console.log('Login successful!')
            return res.send({message: req.body})
        }
    })
})

app.listen(5000, () => {console.log("Server started on port 5000")})