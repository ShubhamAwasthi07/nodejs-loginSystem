const mysql = require("mysql");
const express = require("express");
const bodyparser = require("body-parser");

const encoder = bodyparser.urlencoded();


const app = express();

// app.use('/auth1', require('/auth1'));

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


app.get("/", function (req, res) {
    res.sendFile(__dirname + "./index.hbs");
})

app.post("/", encoder, function (req, res) {
exports.register = (req, res) => {
    console.log(req.body);
    var email = req.body.email;
    var password = req.body.password;
    db.query("SELECT * FROM users WHERE email=? AND password=?", [email, password], function (error, results, fields) {
        if (results.length > 0) {
            res.redirect("/index");
        } else {
            res.redirect("/");
        }
        res.end();
        
    })
        
}
})


// When the user is login Successfully

app.get("./index", function (req, res) {
    res.sendFile(__dirname+"/index.hbs")
})


