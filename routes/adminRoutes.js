const express = require("express");

const { loginAdmin } = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Admin Login
router.post("/login", loginAdmin);

// Protected Admin Test
router.get("/protected", authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: "Admin access granted",
        admin: req.admin
    });
});

module.exports = router;