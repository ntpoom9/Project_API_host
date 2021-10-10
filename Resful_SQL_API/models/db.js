const mysql = require("mysql");
const dbConfig = require("../configs/db.configs");

//Create Connection Database
const connection = mysql.createConnection({   
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB, 
});
//Open the my SQL connection
connection.connect((error)=>{
    if(error) throw error;
    console.log("Successfully connected to the database ...");
})

module.exports = connection;