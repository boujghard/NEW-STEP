const pool = require("../config/db");

const Product = {

    // =========================
    // Get all products
    // =========================
    async getAll() {
        const result = await pool.query(`
            SELECT
                id,
                name,
                price,
                description,
                image,
                category,
                created_at
            FROM products
            ORDER BY id DESC
        `);

        return result.rows;
    },


    // =========================
    // Get product by ID
    // =========================
    async getById(id) {
        const result = await pool.query(
            `
            SELECT
                id,
                name,
                price,
                description,
                image,
                category,
                created_at
            FROM products
            WHERE id = $1
            `,
            [id]
        );

        return result.rows[0];
    },


    // =========================
    // Create product
    // =========================
    async create(product) {

        const {
            name,
            description,
            price,
            image,
            category
        } = product;

        const result = await pool.query(
            `
            INSERT INTO products
            (
                name,
                description,
                price,
                image,
                category
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            `,
            [
                name,
                description || "",
                price,
                image || "",
                category || ""
            ]
        );

        return result.rows[0];
    },


    // =========================
    // Update product
    // =========================
    async update(id, product) {

        const {
            name,
            description,
            price,
            image,
            category
        } = product;

        const result = await pool.query(
            `
            UPDATE products
            SET
                name = $1,
                description = $2,
                price = $3,
                image = $4,
                category = $5
            WHERE id = $6
            RETURNING *
            `,
            [
                name,
                description || "",
                price,
                image || "",
                category || "",
                id
            ]
        );

        return result.rows[0];
    },


    // =========================
    // Delete product
    // =========================
    async delete(id) {

        const result = await pool.query(
            `
            DELETE FROM products
            WHERE id = $1
            RETURNING *
            `,
            [id]
        );

        return result.rows[0];
    }

};

module.exports = Product;