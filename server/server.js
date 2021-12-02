const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const mysql = (require('mysql'));
const fs = require('fs');
const { response } = require('express');
const { fail } = require('assert');

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

//RETRIEVE DATA FROM STUDENT TABLE
app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM student";
    db.query(sqlSelect, (err, result) => {
        return res.send(result)
    })
});

//INSERT DATA FOR REGISTER
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
        return res.send({ fail: { passFail: "Passwords do not match" } })
    }

    else {
        const sqlInsert = "INSERT INTO users (username, password, firstName, lastName, email) VALUES (?, ?, ?, ?, ?)";
        db.query(sqlInsert, [username, password, firstName, lastName, email], (err, result) => {

            if (err) {
                if (err.sqlMessage.includes(dupUserErr)) {
                    return res.send({ fail: { userFail: "Username already in use." } })
                }

                else if (err.sqlMessage.includes(dupEmailErr)) {
                    return res.send({ fail: { emailFail: "E-mail already in use." } })
                }
            }

            else {
                return res.send({ pass: "Registered!" })
            }

        })
    }

})

//CHECK IF USER EXISTS FOR LOGIN
app.post('/api/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const sqlLogin = "SELECT * FROM users WHERE username=? AND password=?";
    db.query(sqlLogin, [username, password], (err, result) => {
        if (err) {
            return res.send({ err: err })
        }

        if (result.length > 0) {
            return res.send({ pass: "Success!" });
        }
        else {
            return res.send({ fail: "Wrong username/password combination!" });
        }
    })
});

//ADDING COMMENTS
app.post('/api/addcomment', (req, res) => {
    const posted_by = req.body.posted_by
    const description = req.body.description
    const blogid = req.body.blogid
    const handleLike = () => {
        if (req.body.sentiment) {
            return "positive"
        }
        else {
            return "negative"
        }
    }
    const sentiment = handleLike()
    var count;
    var created_by;
    var alreadyPosted;

    const checkCount = "SELECT COUNT(*) AS count FROM comments WHERE posted_by = ? AND cdate = DATE(NOW())"
    db.query(checkCount, [posted_by], (err, result) => {
        if (err) {
            return res.send(err)
        } else {
            count = result[0].count
        }
    })

    const query_created_by = "SELECT created_by FROM blogs WHERE blogid = ?"
    db.query(query_created_by, [blogid], (err, result) => {
        if (err) {
            return res.send(err)
        } else {
            created_by = result[0].created_by
        }
    })

    const query_already_posted = "SELECT count(*) as count FROM comments WHERE blogid = ? AND posted_by = ?;"
    db.query(query_already_posted, [blogid, posted_by], (err, result) => {
        if (err) {
            return res.send(err)
        } else {
            alreadyPosted = result[0].count
        }
    })

    setTimeout(() => {
        if (created_by == posted_by) {
            return res.send({ fail: { userFail: "Can't post on your own blog!" } })
        } else if (count >= 3) {
            return res.send({ fail: { countFail: "User exceeded comment limit (3) per day!" } })
        } else if (alreadyPosted >= 1) {
            return res.send({ fail: { alreadyPosted: "Already added a comment to this post!" } })
        }
        else {
            const sqlInsertC = "INSERT INTO comments (sentiment,description,posted_by,cdate,blogid) VALUES (?, ?, ?, DATE(NOW()), ?)";
            db.query(sqlInsertC, [sentiment, description, posted_by, blogid], (err, result) => {

                if (err) {
                    return res.send(err)
                }
                else {
                    return res.send({ pass: "posted" })
                }

            })
        }
    }, 700);
})

//RETRIEVE BLOGS WITH TAGS
app.get('/api/getblogs', (req, res) => {
    const query = "SELECT b.*, GROUP_CONCAT(DISTINCT tag SEPARATOR ', ') AS tags FROM blogs AS b, blogstags AS t WHERE b.blogid = t.blogid GROUP BY t.blogid"
    db.query(query, (err, result) => {
        return res.send(result)
    })
})

//RETRIEVE COMMENTS FOR BLOGS

app.get('/api/getcomments', (req, res) => {
    const query = "SELECT * FROM comments";
    db.query(query, (err, result) => {
        return res.send(result)
    })
})

// CREATE BLOG

app.post('/api/createblog', (req, res) => {
    const description = req.body.description
    const subject = req.body.subject
    const created_by = req.body.created_by

    const tags = req.body.tags.split(',')

    let count;
    let id;
    const checkCount = "SELECT COUNT(*) AS count FROM blogs WHERE created_by = ? AND pdate = DATE(NOW())"

    db.query(checkCount, [created_by], (err, result) => {
        if (err) {
            return res.send(err)
        }

        else {
            count = result[0].count
        }
    })

    setTimeout(() => {

        if (count < 2) {
            const query = "INSERT INTO blogs (description,subject,pdate,created_by) VALUES (?, ?, DATE(NOW()), ?);SELECT LAST_INSERT_ID() AS id;"
            db.query(query, [description, subject, created_by], (err, result) => {

                if (err) {
                    return res.send(err)
                }

                else {
                    id = result[1][0].id
                }

            })

            const queryTags = "INSERT INTO blogstags (blogid,tag) VALUES (?,?)"
            tags.forEach(tag =>
                setTimeout(() => {
                    db.query(queryTags, [id, tag], (err, result) => {
                        if (err) {
                            return res.send(err)
                        }
                    })
                }, 500)
            )
            return res.send({ pass: "Blog Created!" })
        }

        else {
            return res.send({ fail: "User exceeded post limit (2) per day!" })
        }
    }, 500)

});


//RUNNING SCRIPT
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
                return res.send({ err: err })
            }
            else {
                return res.send(result);
            }
        })
    }, 1000);



})

//GET ALL POSTS WITH TAGS FOR SPECIFIC USER IN WHICH ALL COMMENTS ARE POSITIVE
app.post('/api/getPositiveBlogs', (req, res) => {
    const created_by = req.body.created_by
    const query = "SELECT b.*, GROUP_CONCAT(DISTINCT tag SEPARATOR ',') AS tags FROM blogs AS b, comments AS c, blogstags AS t WHERE b.blogid = c.blogid AND b.blogid = t.blogid AND created_by=? GROUP BY b.blogid HAVING GROUP_CONCAT(DISTINCT sentiment SEPARATOR ',') = 'positive';"

    db.query(query, [created_by], (err, result) => {
        if (err) {
            return res.send(err)
        }
        else {
            if (result.length > 0) {
                return res.send(result)
            }
            else {
                return res.send([{subject: "No Users Found!"}])
            }
        }
    })
})

//GET COMMENTS FOR POSITIVE BLOGS
app.post('/api/getPositiveComments', (req, res) => {
    const created_by = req.body.created_by
    const query = "SELECT c.* FROM blogs AS b, comments AS c WHERE b.blogid = c.blogid AND sentiment = 'positive' AND created_by=?;"

    db.query(query, [created_by], (err, result) => {
        if (err) {
            return res.send(err)
        }
        else {
            return res.send(result)
        }
    })
})

//GET USER WHO IS FOLLOWED BY TWO OTHER USERS
app.post('/api/getFollowed', (req, res) => {
    const user1 = '[[:<:]]' + req.body.user1 + '[[:>:]]'
    const user2 = '[[:<:]]' + req.body.user2 + '[[:>:]]'
    const query = "SELECT leadername, GROUP_CONCAT(DISTINCT followername SEPARATOR ', ') AS followers FROM follows GROUP BY leadername HAVING followers REGEXP ? AND followers REGEXP ?;"
    db.query(query, [user1, user2], (err, result) => {
        if (err) {
            return res.send(err)
        }
        else {
            if (result.length > 0) {
                return res.send(result)
            }
            else {
                return res.send([{leadername: "No Users Found!"}])
            }
        }
    })
})

//GET USERS THAT POSTED THE MOST BLOGS ON SPECIFIC DAY
app.get('/api/getMostBlogs', (req, res) => {
    const query = "SELECT created_by, MAX(num_posts) FROM (SELECT created_by, COUNT(*) as num_posts from blogs where pdate = '2021-12-02' group by created_by) as countblog;"
    db.query(query, (err, result) => {
        if (err) {
            return res.send(err)
        }
        else {
            if (result.length > 0) {
                return res.send(result)
            }
            else {
                return res.send([{created_by: "No Users Found!"}])
            }
        }
    })
})

//GET USERS THAT HAVE NOT POSTED ANY BLOGS
app.get('/api/getUserNoBlog', (req, res) => {
    const query = "SELECT DISTINCT username FROM users LEFT JOIN blogs ON username = created_by WHERE created_by IS NULL;"
    db.query(query, (err, result) => {
        if (err) {
            return res.send(err)
        }
        else {
            if (result.length > 0) {
                return res.send(result)
            }
            else {
                return res.send([{username: "No Users Found!"}])
            }
        }
    })
})

//GET USERS THAT HAVE ONLY POSTED NEGATIVE COMMENTS
app.get('/api/getUserOnlyNeg', (req, res) => {
    const query = "SELECT posted_by, GROUP_CONCAT(DISTINCT sentiment SEPARATOR ',') AS sentiments FROM comments GROUP BY posted_by HAVING sentiments = 'negative';"
    db.query(query, (err, result) => {
        if (err) {
            return res.send(err)
        }
        else {
            if (result.length > 0) {
                return res.send(result)
            }
            else {
                return res.send([{posted_by: "No Users Found!"}])
            }
        }
    })
})

//GET USERS THAT HAVE NO NEGATIVE COMMENTS ON ANY BLOG
app.get('/api/getNoNegativeComments', (req, res) => {
    const query = "SELECT created_by, GROUP_CONCAT(DISTINCT sentiment SEPARATOR ',') AS sentiments FROM blogs AS b, comments AS c WHERE b.blogid = c.blogid GROUP BY created_by HAVING sentiments = 'positive';"
    db.query(query, (err, result) => {
        if (err) {
            return res.send(err)
        }
        else {
            if (result.length > 0) {
                return res.send(result)
            }
            else {
                return res.send([{created_by: "No Users Found!"}])
            }
        }
    })
})

//LISTENER
app.listen(3001, () => {
    console.log('running on port 3001')
});

//for nodemon: npm run devStart