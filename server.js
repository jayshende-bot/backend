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
app.use(cors());
app.use(express.json());

// ================================
// STATIC FILES
// ================================
app.use("/images", express.static(path.join(__dirname, "images")));

// ================================
// DATABASE CONNECTION (🔥 FIRST)
// ================================
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");

    // ================================
    // ROUTES (🔥 ONLY AFTER DB CONNECTS)
    // ================================
    app.use("/api/v1/products", productRoutes);

    // ================================
    // START SERVER
    // ================================
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
  });
