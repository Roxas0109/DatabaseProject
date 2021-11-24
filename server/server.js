const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const mysql = (require('mysql'));
const fs = require('fs');
const { response } = require('express');

const db = mysql.createPool({
    host: 'comp440dbserver.mysql.database.azure.com',
    user: 'comp440@comp440dbserver',
    password: 'pass1234',
    database: 'dbproject',
    multipleStatements: true
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

//DUE TO PLACEHOLDERS (?) WE CAN AVOID SQL INJECTION ATTACKS

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM student";
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
});

app.post('/api/insert', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const passwordConfirm = req.body.passwordConfirm
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email

    const dupEmailErr = "for key 'email_UNIQUE'"
    const dupUserErr = "for key 'PRIMARY'"

    if (password != passwordConfirm) {
        res.send({ fail: { passFail: "Passwords do not match" } })
    }

    else {
        const sqlInsert = "INSERT INTO user (username, password, firstName, lastName, email) VALUES (?, ?, ?, ?, ?)";
        db.query(sqlInsert, [username, password, firstName, lastName, email], (err, result) => {

            if (err) {
                if (err.sqlMessage.includes(dupUserErr)) {
                    res.send({ fail: { userFail: "Username already in use." } })
                }

                else if (err.sqlMessage.includes(dupEmailErr)) {
                    res.send({ fail: { emailFail: "E-mail already in use." } })
                }
            }

            else {
                res.send({ pass: "Registered!" })
            }

        })
    }

})


app.post('/api/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const sqlLogin = "SELECT * FROM user WHERE username=? AND password=?";
    db.query(sqlLogin, [username, password], (err, result) => {
        if (err) {
            res.send({ err: err })
        }

        if (result.length > 0) {
            res.send({ pass: "Success!" });
        }
        else {
            res.send({ fail: "Wrong username/password combination!" });
        }
    })
});

app.post('/api/addcomment', (req, res) => {
    const username = req.body.username
    const like = req.body.like
    const comment = req.body.comment
    var count;
    const checkCount = "SELECT COUNT(*) AS count FROM comments WHERE username = ?"
    db.query(checkCount, [username], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            count = result[0].count
        }
    })
    setTimeout(() => {
        if (count < 3) {
            const sqlInsertC = "INSERT INTO comments (username,likes,comments) VALUES (?, ?, ?)";
            db.query(sqlInsertC, [username, like, comment], (err, result) => {

                if (err) {
                    res.send(err)
                }
                else {
                    res.send({ pass: "posted" })
                }

            })
        } else {
            res.send({ fail: { countFail: "Limit Exceeded" } })
        }
    }, 500);
})


app.get('/api/sqlIns', (req, res) => {
    let sqlQueries = "";
    fs.readFile('sqlTest.sql', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        sqlQueries = data;
    })

    setTimeout(() => {
        db.query(sqlQueries, (err, result) => {
            if (err) {
                res.send({ err: err })
            }
            else {
                res.send(result);
            }
        })
    }, 1000);

})

app.listen(3001, () => {
    console.log('running on port 3001')
});

//for nodemon: npm run devStart
