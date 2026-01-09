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

const express = require("express");
const cors = require("cors");
const path = require("path");
const productRoutes = require("./productroutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/", (req, res) => {
  res.status(200).send("API running 🚀");
});

app.use("/api/v1/products", productRoutes);

/* 🔴 GLOBAL ERROR HANDLER (VERY IMPORTANT) */
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

module.exports = app;
