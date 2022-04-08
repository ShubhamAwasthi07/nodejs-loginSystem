const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const async = require("hbs/lib/async");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});



exports.register = (req, res) => {
    console.log(req.body);

    // const name = req.body.name;
    // const email = req.body.email;
    // const password = req.body.password;
    // const repassword = req.body.repassword;

    const { name, email, password, repassword } = req.body;

    db.query('SELECT email FROM users where email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.length > 0) {
            return res.render('register', {
                message: 'This email is already Exist!! '
                
            })
        } else if (password !== repassword) {
            return res.render('register', {
                message: 'Password do not Matched !!! '
                
            });
            
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);
        // res.send("testing");

        db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (error,results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('register', {
                message: 'User Registered Successfully!!! '
                
              });
            }
        })

        
    
    });

}

