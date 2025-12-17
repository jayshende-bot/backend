

const express = require("express");
const router = express.Router();
const ProductController = require("./productController");
const authMiddleware = require("./authentication");








// ================================
// USER ROUTES
// ================================
router.post("/register", ProductController.register);
router.post("/login", ProductController.login);

  
//=========================================================//


// Apply authentication middleware to all routes below
router.use(authMiddleware);


// ================================
// ORDER ROUTES (PLACE FIRST)
// ================================

// FIX: Changed route from "/orders/create" to a cleaner "/order" to resolve 404 error
router.post("/order", ProductController.createOrder); // <--- FIXED ROUTE
router.get("/orders/user/:email", ProductController.getUserOrders);
router.get("/orders", ProductController.getAllOrders);
router.delete("/orders", ProductController.deleteAllOrders);

// ================================
// PRODUCT ROUTES
// ================================

// Save one product
router.post("/:type/save", ProductController.saveOne);

// Save multiple products
router.post("/:type/save-all", ProductController.saveAll);

// Get all products of a type (URL: /api/v1/products/veg, /api/v1/products/nonveg, etc.)
router.get("/:type", ProductController.getAll);

// Delete one product by ID
router.delete("/:type/:id", ProductController.deleteOne);

// Delete all products of a type
router.delete("/:type", ProductController.deleteAll);




module.exports = router;