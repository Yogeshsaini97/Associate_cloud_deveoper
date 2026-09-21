const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "order-processing-db.chym24c2q5hm.ap-south-1.rds.amazonaws.com",
    port: 3306,
    user: "yogeshsaini",
    password: "Ejoty157",
    database: "ordersDbyogi",

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;