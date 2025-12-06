// const express = require("express");
// const mongoose = require("mongoose");
// const router = require("./productroutes");
// const cors = require("cors");
// const path = require("path");

// const app = express();

// // Middleware
// app.use(express.json());

// // ✅ CORS fix: Allow frontend (5174) to access backend (3000)
// app.use(
//   cors({
//     origin: "http://localhost:5173", // <- Updated to match your frontend port
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   })
// );

// // ✅ Serve images from /images folder
// app.use("/images", express.static(path.join(__dirname, "images")));

// // MongoDB connection
// const MONGODB_URI =
//   "mongodb+srv://shendejay01_db_user:fbaxs1enRmrMQggB@cluster0.nmzlev1.mongodb.net/productsdb?retryWrites=true&w=majority&appName=Cluster0";

// mongoose
//   .connect(MONGODB_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// // Routes
// app.use("/api/v1/products", router);

// // Start server
// app.listen(3000, () => {
//   console.log("Server running at http://localhost:3000");
// });





require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const productRoutes = require("./productroutes");

const app = express();

// Middleware
app.use(express.json());

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Serve Images
app.use("/images", express.static(path.join(__dirname, "images")));

// Routes
app.use("/api/v1/products", productRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
