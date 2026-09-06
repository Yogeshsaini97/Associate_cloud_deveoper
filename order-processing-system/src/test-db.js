const pool = require("./config/database");

async function testDatabase() {
    try {
        const [rows] = await pool.query(
            "SELECT 1 AS result"
        );

        console.log("Database connected successfully");
        console.log(rows);

    } catch (error) {
        console.error("Database connection failed:");
        console.error(error.message);

    } finally {
        await pool.end();
    }
}

testDatabase();