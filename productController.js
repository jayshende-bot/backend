

// const ProductService = require("./ProductService");
// const User = require("./userSchema");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// class ProductController {
//   // ================= REGISTER =================
//   static async register(req, res) {
//     try {
//       const { name, email, password, phone, address } = req.body;

//       if (!name || !email || !password || !phone || !address ||
//           !address.house || !address.street || !address.city || !address.state || !address.pincode) {
//         return res.status(400).json({ success: false, message: "All fields including address are required" });
//       }

//       const existingUser = await User.findOne({ email });
//       if (existingUser) return res.status(400).json({ success: false, message: "Email already registered" });

//       const hashedPassword = await bcrypt.hash(password, 10);

//       const user = await User.create({
//         name, email, phone, password: hashedPassword,
//         address: { ...address, pincode: String(address.pincode) },
//       });

//       const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

//       res.status(201).json({ success: true, message: "Registration successful", token, user });
//     } catch (error) {
//       console.error("Register Error:", error);
//       res.status(500).json({ success: false, message: "Registration failed" });
//     }
//   }

//   // ================= LOGIN =================
//   static async login(req, res) {
//     try {
//       const { email, password } = req.body;
//       if (!email || !password) return res.status(400).json({ success: false, message: "Email and password are required" });

//       const user = await User.findOne({ email });
//       if (!user) return res.status(404).json({ success: false, message: "User not found" });

//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) return res.status(401).json({ success: false, message: "Invalid email or password" });

//       const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

//       res.json({ success: true, message: "Login successful", token, user });
//     } catch (error) {
//       console.error("Login Error:", error);
//       res.status(500).json({ success: false, message: "Login failed" });
//     }
//   }

//   // ================= PRODUCTS =================
//   static async getAll(type, req, res) {
//     try {
//       const products = await ProductService.getAll(type);
//       res.status(200).json({ success: true, data: products });
//     } catch (error) {
//       console.error("Get Products Error:", error);
//       res.status(500).json({ success: false, message: "Failed to fetch products" });
//     }
//   }

//   static async saveOne(req, res) {
//     try {
//       const result = await ProductService.saveOne(req.params.type, req.body);
//       res.status(201).json({ success: true, data: result });
//     } catch (error) {
//       console.error("Save One Error:", error);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   }

//   static async saveAll(req, res) {
//     try {
//       const result = await ProductService.saveAll(req.params.type, req.body);
//       res.status(201).json({ success: true, data: result });
//     } catch (error) {
//       console.error("Save All Error:", error);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   }

//   static async deleteOne(req, res) {
//     try {
//       const result = await ProductService.deleteOne(req.params.type, req.params.id);
//       res.json({ success: true, data: result });
//     } catch (error) {
//       console.error("Delete One Error:", error);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   }

//   static async deleteAll(req, res) {
//     try {
//       const result = await ProductService.deleteAll(req.params.type);
//       res.json({ success: true, deletedCount: result.deletedCount });
//     } catch (error) {
//       console.error("Delete All Error:", error);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   }

//   // ================= ORDERS =================
//   static async createOrder(req, res) {
//     try {
//       const order = await ProductService.createOrder(req.body);
//       res.status(201).json({ success: true, message: "Order placed successfully", data: order });
//     } catch (error) {
//       console.error("Create Order Error:", error);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   }

//   static async getUserOrders(req, res) {
//     try {
//       const orders = await ProductService.getUserOrders(req.params.email);
//       res.json({ success: true, data: orders });
//     } catch (error) {
//       console.error("Get User Orders Error:", error);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   }

//   static async getAllOrders(req, res) {
//     try {
//       const orders = await ProductService.getAllOrders();
//       res.json({ success: true, data: orders });
//     } catch (error) {
//       console.error("Get All Orders Error:", error);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   }

//   static async deleteAllOrders(req, res) {
//     try {
//       const result = await ProductService.deleteAllOrders();
//       res.json({ success: true, deletedCount: result.deletedCount });
//     } catch (error) {
//       console.error("Delete All Orders Error:", error);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   }
// }

// module.exports = ProductController;










const ProductService = require("./ProductService");
const User = require("./userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class ProductController {
  // ================= REGISTER =================
  static async register(req, res) {
    try {
      const { name, email, password, phone, address } = req.body;

      if (!name || !email || !password || !phone || !address ||
          !address.house || !address.street || !address.city || !address.state || !address.pincode) {
        return res.status(400).json({ success: false, message: "All fields including address are required" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ success: false, message: "Email already registered" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name, email, phone, password: hashedPassword,
        address: { ...address, pincode: String(address.pincode) },
      });

      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

      res.status(201).json({ success: true, message: "Registration successful", token, user });
    } catch (error) {
      console.error("Register Error:", error);
      res.status(500).json({ success: false, message: "Registration failed" });
    }
  }

  // ================= LOGIN =================
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ success: false, message: "Email and password are required" });

      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ success: false, message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ success: false, message: "Invalid email or password" });

      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

      res.json({ success: true, message: "Login successful", token, user });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ success: false, message: "Login failed" });
    }
  }

  // ================= PRODUCTS =================
  static async getAll(type, req, res) {
    try {
      const products = await ProductService.getAll(type);
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      console.error("Get Products Error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch products" });
    }
  }

  static async saveOne(req, res) {
    try {
      // ❌ Prevent saving orders via saveOne
      if (req.params.type === "order") {
        return res.status(400).json({ success: false, message: "Orders must be created using createOrder() API" });
      }

      const result = await ProductService.saveOne(req.params.type, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      console.error("Save One Error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async saveAll(req, res) {
    try {
      // ❌ Prevent saving orders via saveAll
      if (req.params.type === "order") {
        return res.status(400).json({ success: false, message: "Orders must be created using createOrder() API" });
      }

      const result = await ProductService.saveAll(req.params.type, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      console.error("Save All Error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async deleteOne(req, res) {
    try {
      const result = await ProductService.deleteOne(req.params.type, req.params.id);
      res.json({ success: true, data: result });
    } catch (error) {
      console.error("Delete One Error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async deleteAll(req, res) {
    try {
      const result = await ProductService.deleteAll(req.params.type);
      res.json({ success: true, deletedCount: result.deletedCount });
    } catch (error) {
      console.error("Delete All Error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // ================= ORDERS =================
  static async createOrder(req, res) {
    try {
      const order = await ProductService.createOrder(req.body);
      res.status(201).json({ success: true, message: "Order placed successfully", data: order });
    } catch (error) {
      console.error("Create Order Error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getUserOrders(req, res) {
    try {
      const orders = await ProductService.getUserOrders(req.params.email);
      res.json({ success: true, data: orders });
    } catch (error) {
      console.error("Get User Orders Error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getAllOrders(req, res) {
    try {
      const orders = await ProductService.getAllOrders();
      res.json({ success: true, data: orders });
    } catch (error) {
      console.error("Get All Orders Error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async deleteAllOrders(req, res) {
    try {
      const result = await ProductService.deleteAllOrders();
      res.json({ success: true, deletedCount: result.deletedCount });
    } catch (error) {
      console.error("Delete All Orders Error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = ProductController;
