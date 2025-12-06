// authentication.js
const jwt = require("jsonwebtoken");

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  try {
    // 1. Check if token exists in authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        status: false,
        message: "Authorization token missing",
      });
    }

    // 2. Extract token (Bearer <token>)
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Token missing",
      });
    }

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ensure JWT_SECRET is in your .env

    // 4. Store decoded data in request object
    req.user = decoded;

    // 5. Allow request to continue
    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
