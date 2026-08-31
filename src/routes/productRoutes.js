const express = require("express");

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public - Get products
router.get("/", getProducts);

// Public - Get one product
router.get("/:id", getProduct);

// Admin only - Create product
router.post("/", authMiddleware, createProduct);

// Admin only - Update product
router.put("/:id", authMiddleware, updateProduct);

// Admin only - Delete product
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;