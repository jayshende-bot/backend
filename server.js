require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const productRoutes = require("./productroutes");

const app = express();

// ================================
// MIDDLEWARE
// ================================
// Use CORS middleware to handle preflight requests automatically
app.use(cors());   
app.use(express.json()); // Parse JSON requests

// ================================
// STATIC FILES
// ================================
app.use("/images", express.static(path.join(__dirname, "images")));

// ================================
// ROUTES
// ================================
// Prefix all routes with /api/v1/products for clarity
app.use("/api/v1/products", productRoutes);

// ================================
// DATABASE CONNECTION
// ================================
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

// ================================
// START SERVER
// ================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
