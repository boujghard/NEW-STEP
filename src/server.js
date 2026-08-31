const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");

const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// =========================
// Admin routes
// =========================
app.use("/api/admin", adminRoutes);

// =========================
// Product routes
// =========================
app.use("/api/products", productRoutes);

// =========================
// Home
// =========================
app.get("/", (req, res) => {
    res.json({
        message: "Chika Kids Backend is working!"
    });
});

// =========================
// Test database
// =========================
app.get("/api/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            success: true,
            message: "Database connected successfully",
            time: result.rows[0].now
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Database connection failed"
        });
    }
});

// =========================
// Debug products
// =========================
app.get("/api/debug-products", async (req, res) => {
    try {
        const dbInfo = await pool.query(`
            SELECT
                current_database() AS database_name,
                current_schema() AS schema_name,
                current_user AS database_user
        `);

        const products = await pool.query(`
            SELECT id, name, price
            FROM products
            ORDER BY id DESC
        `);

        res.json({
            success: true,
            database: dbInfo.rows[0],
            count: products.rows.length,
            products: products.rows
        });

    } catch (error) {
        console.error("Debug products error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// =========================
// Start server
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});