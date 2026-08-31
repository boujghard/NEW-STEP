const Product = require("../models/Product");


// =========================
// Get all products
// =========================
const getProducts = async (req, res) => {
    try {

        const products = await Product.getAll();

        res.json({
            success: true,
            products
        });

    } catch (error) {

        console.error("Get products error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get products",
            error: error.message
        });
    }
};


// =========================
// Get one product
// =========================
const getProduct = async (req, res) => {
    try {

        const product = await Product.getById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.json({
            success: true,
            product
        });

    } catch (error) {

        console.error("Get product error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get product",
            error: error.message
        });
    }
};


// =========================
// Create product
// =========================
const createProduct = async (req, res) => {
    try {

        const {
            name,
            description,
            price,
            image,
            category
        } = req.body || {};

        if (!name || price === undefined || price === null) {
            return res.status(400).json({
                success: false,
                message: "Name and price are required"
            });
        }

        const product = await Product.create({
            name,
            description,
            price,
            image,
            category
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {

        console.error("Create product error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create product",
            error: error.message
        });
    }
};


// =========================
// Update product
// =========================
const updateProduct = async (req, res) => {
    try {

        const productId = req.params.id;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        const {
            name,
            description,
            price,
            image,
            category
        } = req.body || {};

        if (!name || price === undefined || price === null) {
            return res.status(400).json({
                success: false,
                message: "Name and price are required"
            });
        }

        const product = await Product.update(
            productId,
            {
                name,
                description,
                price,
                image,
                category
            }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.json({
            success: true,
            message: "Product updated successfully",
            product
        });

    } catch (error) {

        console.error("Update product error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update product",
            error: error.message
        });
    }
};


// =========================
// Delete product
// =========================
const deleteProduct = async (req, res) => {
    try {

        const productId = req.params.id;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        const product = await Product.delete(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.json({
            success: true,
            message: "Product deleted successfully",
            product
        });

    } catch (error) {

        console.error("Delete product error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete product",
            error: error.message
        });
    }
};


// =========================
// Export
// =========================
module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};