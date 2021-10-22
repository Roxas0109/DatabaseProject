const express = require('express');
const app = express();
const mysql = (require('mysql'));

const db = mysql.createPool({
    host: 'localhost',
    user: 'comp440',
    password: 'pass1234',
    database: 'dbproject',
});

app.get('/', (req, res)=>{
    res.send('helloworld im alqn')
});

app.listen(3001, ()=>{
    console.log('running on port 3001')
});