// const express = require("express");
// const router = express.Router();
// const ProductController = require("./productController");
// const authMiddleware = require("./authentication");

// // ================================
// // CORS (Handled via middleware in server.js)
// // ================================
// // No need to manually do router.options("*", ...)
// // Make sure server.js has: app.use(cors());

// // ================================
// // AUTH ROUTES (PUBLIC)
// // ================================
// router.post("/register", ProductController.register);
// router.post("/login", ProductController.login);

// // ================================
// // PRODUCT ROUTES (PUBLIC)
// // ================================
// router.get("/veg", (req, res) => ProductController.getAll("veg", req, res));
// router.get("/nonveg", (req, res) => ProductController.getAll("nonveg", req, res));
// router.get("/drink", (req, res) => ProductController.getAll("drink", req, res));

// // ================================
// // APPLY AUTH MIDDLEWARE
// // ================================
// router.use(authMiddleware);

// // ================================
// // ORDER ROUTES (PROTECTED)
// // ================================
// router.post("/orders", ProductController.createOrder);
// router.get("/orders/user/:email", ProductController.getUserOrders);
// router.get("/orders", ProductController.getAllOrders);
// router.delete("/orders", ProductController.deleteAllOrders);

// // ================================
// // PRODUCT ROUTES (ADMIN)
// // ================================
// router.post("/:type", ProductController.saveOne);
// router.post("/:type/bulk", ProductController.saveAll);
// router.delete("/:type/:id", ProductController.deleteOne);
// router.delete("/:type", ProductController.deleteAll);

// module.exports = router;




const express = require("express");
const router = express.Router();
const ProductController = require("./productController");
const authMiddleware = require("./authentication");

// ================================
// HELPER: Async wrapper for routes
// ================================
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// ================================
// PUBLIC AUTH ROUTES
// ================================
router.post("/register", asyncHandler(ProductController.register));
router.post("/login", asyncHandler(ProductController.login));

// ================================
// PUBLIC PRODUCT ROUTES
// ================================
router.get("/veg", asyncHandler((req, res) => ProductController.getAll("veg", req, res)));
router.get("/nonveg", asyncHandler((req, res) => ProductController.getAll("nonveg", req, res)));
router.get("/drink", asyncHandler((req, res) => ProductController.getAll("drink", req, res)));

// ================================
// APPLY AUTH MIDDLEWARE
// ================================
router.use(authMiddleware);

// ================================
// PROTECTED ORDER ROUTES
// ================================
router.post("/orders", asyncHandler(ProductController.createOrder));
router.get("/orders/user/:email", asyncHandler(ProductController.getUserOrders));
router.get("/orders", asyncHandler(ProductController.getAllOrders));
router.delete("/orders", asyncHandler(ProductController.deleteAllOrders));

// ================================
// ADMIN PRODUCT ROUTES
// ================================
router.post("/:type", asyncHandler(ProductController.saveOne));
router.post("/:type/bulk", asyncHandler(ProductController.saveAll));
router.delete("/:type/:id", asyncHandler(ProductController.deleteOne));
router.delete("/:type", asyncHandler(ProductController.deleteAll));

// ================================
// EXPORT
// ================================
module.exports = router;
