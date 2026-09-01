require("dotenv").config();

const bcrypt = require("bcryptjs");
const pool = require("./src/config/db");

async function createAdmin() {
    try {
        const username = "admin";
        const password = "Admin@123456";

        const passwordHash = await bcrypt.hash(password, 12);

        await pool.query(
            `INSERT INTO admins (username, password_hash)
             VALUES ($1, $2)`,
            [username, passwordHash]
        );

        console.log("Admin created successfully");
        console.log("Username:", username);

        await pool.end();
    } catch (error) {
        console.error("Error creating admin:", error);
        await pool.end();
    }
}

createAdmin();