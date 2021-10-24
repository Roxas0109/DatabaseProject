const express = require('express');
const app = express();
const mysql = (require('mysql'));

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'comp440',
    password: 'pass1234',
    database: 'dbproject'
});

app.get('/', (req, res)=>{
    const sqlInsert = "INSERT INTO user (username, password, firstName, lastName, email) VALUES ('al', 'a', 'b', 'c', 'd')";
    db.query(sqlInsert, (err, result)=>{
        res.send('inserted!')
    })
});

app.listen(3001, ()=>{
    console.log('running on port 3001')
});

//for nodemon: npm run devStart