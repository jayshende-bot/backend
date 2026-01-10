// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");

// const productRoutes = require("./productroutes");

// const app = express();

// // ================================
// // MIDDLEWARE
// // ================================
// app.use(cors());
// app.use(express.json());

// // ================================
// // STATIC FILES
// // ================================
// app.use("/images", express.static(path.join(__dirname, "images")));

// // ================================
// // DATABASE CONNECTION (🔥 FIRST)
// // ================================
// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log("✅ MongoDB Connected");

//     // ================================
//     // ROUTES (🔥 ONLY AFTER DB CONNECTS)
//     // ================================
//     app.use("/api/v1/products", productRoutes);

//     // ================================
//     // START SERVER
//     // ================================
//     const PORT = process.env.PORT || 3000;
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB Connection Failed:", err);
//   });
// require("dotenv").config();require("dotenv").config();
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./db");
const productRoutes = require("./productroutes");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= CONNECT DB ONCE ================= */
let dbConnected = false;

app.use(async (req, res, next) => {
  try {
    if (!dbConnected) {
      await connectDB();
      dbConnected = true;
      console.log("✅ MongoDB connected");
    }
    next();
  } catch (err) {
    console.error("❌ DB error:", err.message);
    res.status(500).json({ success: false, message: "Database error" });
  }
});

/* ================= ROUTES ================= */
app.use("/api/v1/products", productRoutes);

/* ================= HEALTH ================= */
app.get("/", (req, res) => {
  res.json({ success: true, message: "API running 🚀" });
});

/* ================= LOCAL ONLY ================= */
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally on port ${PORT}`);
  });
}

/* ================= EXPORT ================= */
module.exports = app;
