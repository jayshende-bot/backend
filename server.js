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
// require("dotenv").config();

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const productRoutes = require("./productroutes");

const app = express();

/* ✅ CORS — ALLOW ALL (SAFE FOR DEV + VERCEL) */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

/* ✅ PRE-FLIGHT */
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/", (req, res) => {
  res.status(200).send("API running 🚀");
});

app.use("/api/v1/products", productRoutes);

/* ❗ ERROR HANDLER MUST BE LAST */
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err.message);
  res.status(500).json({
    success: false,
    message: err.message
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
