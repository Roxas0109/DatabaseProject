const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const mysql = (require('mysql'));

const db = mysql.createPool({
    host: 'comp440dbserver.mysql.database.azure.com',
    user: 'comp440@comp440dbserver',
    password: 'pass1234',
    database: 'dbproject'
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/get', (req, res)=>{
    const sqlSelect = "SELECT * FROM user";
    db.query(sqlSelect, (err, result)=>{
        res.send(result)
    })
});

app.post('/api/insert', (req, res)=>{
    const username = req.body.username
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email

    const sqlInsert = "INSERT INTO user (username, password, firstName, lastName, email) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlInsert, [username, password, firstName, lastName, email], (err, result)=>{
        res.send(result)
    })
});

app.listen(3001, ()=>{
    console.log('running on port 3001')
});

//for nodemon: npm run devStart