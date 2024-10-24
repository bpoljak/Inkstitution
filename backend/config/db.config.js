const mysql = require("mysql");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

try {
    const connection = mysql.createConnection({
        host: process.env.host, 
        user: process.env.user, 
        password: process.env.password, 
        database: process.env.database, 
        port: process.env.port
    });

    connection.connect((error) => {
        if (error) {
            console.error("Error connecting to the database:", error);
            return;
        }
        console.log("Successfully connected to the database.");
    });

    module.exports = connection;

} catch (error) {
    console.error("Error in database config setup:", error);
}
