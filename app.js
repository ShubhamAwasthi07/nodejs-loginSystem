const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, "./public");
// console.log(__dirname);
app.use(express.static(publicDirectory));

//Parser URL encoded bodies (as sent by HTML form)
app.use(express.urlencoded({ extended: false }));
//Parser JSON bodies (as sent by API clients )
app.use(express.json());


app.set('view engine', 'hbs');

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("MYSQL Connected...")
    }
    
})

// Define Routes

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
// app.use('/auth1', require('./routes/auth1'));

app.listen(5000, () => {
    console.log("Server started on port 5000"); 
})




