require("dotenv").config();
const app = require("./server");
const connectDB = require("./db");

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server start failed:", err);
  }
})();
