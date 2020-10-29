const mysql = require("mysql");
// require('dotenv/config');

// Create a connection to the database
// const connection = mysql.createConnection({
//     // host: process.env.DB_HOST,
//     // user: process.env.DB_USER,
//     // password: process.env.DB_PASSWORD,
//     // database: process.env.DB_NAME

//     host: 'kavfu5f7pido12mr.cbetxkdyhwsb.us-east-1.rds.amazonaws.com	',
//     user: 's47a441lnzzacrha',
//     password: 'knni0klsmbhgr2ru',
//     database: 'rei7ydl0f2fmwa70'
// });

const connection = mysql.createConnection({
    host: 'kavfu5f7pido12mr.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 's47a441lnzzacrha',
    password: 'knni0klsmbhgr2ru',
    database: 'rei7ydl0f2fmwa70'
});

// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = connection;