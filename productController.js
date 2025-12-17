

// const ProductService = require("./ProductService");
// const User = require("./userSchema");
// const { Veg, Nonveg, Drink, Order } = require("./schema");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");



// class ProductController {
//   // ===============  REGISTER & LOGIN ===============  

//   static async register(req, res) {
//     try {
//       const { name, email, password, phone, address } = req.body;

//       // 1. Validate fields
//       if (!name || !email || !password || !phone || !address) {
//         return res.status(400).json({
//           success: false,
//           message: "All fields are required",
//         });
//       }

//       // 2. Check if email exists
//       const exists = await User.findOne({ email });
//       if (exists) {
//         return res.status(400).json({
//           success: false,
//           message: "Email already registered",
//         });
//       }

//       // 3. Fix: Convert pincode to string always
//       if (address.pincode) {
//         address.pincode = String(address.pincode);
//       }

//       // 4. Hash password
//       const hashedPassword = await bcrypt.hash(password, 10);

//       // 5. Create user
//       const user = await User.create({
//         name,
//         email,
//         phone,
//         password: hashedPassword,
//         address,
//       });

//       // 6. Token generation
//       const token = jwt.sign(
//         { id: user._id, email: user.email },
//         process.env.JWT_SECRET || "MY_SECRET_KEY",
//         { expiresIn: "7d" }
//       );

//       res.status(201).json({
//         success: true,
//         message: "Registration successful",
//         token,
//         user,
//       });

//     } catch (err) {
//       res.status(500).json({ success: false, error: err.message });
//     }
//   }


//   // ------------------ LOGIN ------------------
//   static async login(req, res) {
//     try {
//       const { email, password } = req.body;

//       // 1. Check user exists
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(404).json({
//           success: false,
//           message: "User not found",
//         });
//       }

//       // 2. Compare hashed password
//       const validPassword = await bcrypt.compare(password, user.password);
//       if (!validPassword) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid email or password",
//         });
//       }

//       // 3. Generate token
//       const token = jwt.sign(
//         { id: user._id, email: user.email },
//         process.env.JWT_SECRET || "MY_SECRET_KEY",
//         { expiresIn: "7d" }
//       );

//       res.json({
//         success: true,
//         message: "Login successful",
//         token,
//         user,
//       });

//     } catch (error) {
//       res.status(500).json({ success: false, error: error.message });
//     }
//   }

//   // ------------------ PRODUCT ------------------

//   static async saveOne(req, res) {
//     try {
//       const result = await ProductService.saveOne(req.params.type, req.body);
//       res.json({ success: true, data: result });
//     } catch (err) {
//       res.status(500).json({ success: false, error: err.message });
//     }
//   }

//   static async saveAll(req, res) {
//     try {
//       const result = await ProductService.saveAll(req.params.type, req.body);
//       res.json({ success: true, data: result });
//     } catch (err) {
//       res.status(500).json({ success: false, error: err.message });
//     }
//   }

//   static async getAll(req, res) {
//     try {
//       const result = await ProductService.getAll(req.params.type);
//       res.json(result);
//     } catch (err) {
//       res.status(500).json({ success: false, error: err.message });
//     }
//   }

//   static async deleteOne(req, res) {
//     try {
//       const result = await ProductService.deleteOne(
//         req.params.type,
//         req.params.id
//       );
//       res.json({ success: true, data: result });
//     } catch (err) {
//       res.status(500).json({ success: false, error: err.message });
//     }
//   }

//   static async deleteAll(req, res) {
//     try {
//       const result = await ProductService.deleteAll(req.params.type);
//       res.json({ success: true, deletedCount: result.deletedCount });
//     } catch (err) {
//       res.status(500).json({ success: false, error: err.message });
//     }
//   }


//   // ------------------ ORDER ------------------

//   static async createOrder(req, res) {
//     try {
//       const order = await ProductService.saveOne("order", req.body);
//       res.status(201).json({
//         success: true,
//         message: "Order placed successfully",
//         order
//       });
//     } catch (err) {
//       res.status(500).json({ success: false, message: err.message });
//     }
//   }

//   static async getUserOrders(req, res) {
//     try {
//       const orders = await ProductService.getUserOrders(req.params.email);
//       res.json({ success: true, orders });
//     } catch (err) {
//       res.status(500).json({ success: false, message: err.message });
//     }
//   }

//   static async getAllOrders(req, res) {
//     try {
//       const orders = await ProductService.getAllOrders();
//       res.json({ success: true, orders });
//     } catch (err) {
//       res.status(500).json({ success: false, message: err.message });
//     }
//   }

//   static async deleteAllOrders(req, res) {
//     try {
//       const result = await ProductService.deleteAllOrders();
//       res.json({ success: true, deletedCount: result.deletedCount });
//     } catch (err) {
//       res.status(500).json({ success: false, message: err.message });
//     }
//   }
// }

// module.exports = ProductController;














const ProductService = require("./ProductService");
const User = require("./userSchema");
const { Veg, Nonveg, Drink, Order } = require("./schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class ProductController {
  // ===============  REGISTER & LOGIN ===============  

  static async register(req, res) {
    try {
      const { name, email, password, phone, address } = req.body;

      // 1. Validate all fields including nested address fields
      if (
        !name || !email || !password || !phone || !address ||
        !address.house || !address.street || !address.city ||
        !address.state || !address.pincode
      ) {
        return res.status(400).json({
          success: false,
          message: "All fields including address are required",
        });
      }

      // 2. Check if email already exists
      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(400).json({
          success: false,
          message: "Email already registered",
        });
      }

      // 3. Convert pincode to string to ensure consistent type
      address.pincode = String(address.pincode);

      // 4. Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // 5. Create new user
      const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
        address,
      });

      // 6. Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET || "MY_SECRET_KEY",
        { expiresIn: "7d" }
      );

      res.status(201).json({
        success: true,
        message: "Registration successful",
        token,
        user,
      });

    } catch (err) {
      console.error("Register error:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  }

  // ------------------ LOGIN ------------------
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET || "MY_SECRET_KEY",
        { expiresIn: "7d" }
      );

      res.json({
        success: true,
        message: "Login successful",
        token,
        user,
      });

    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  }

  // ------------------ PRODUCT ------------------

  static async saveOne(req, res) {
    try {
      const result = await ProductService.saveOne(req.params.type, req.body);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async saveAll(req, res) {
    try {
      const result = await ProductService.saveAll(req.params.type, req.body);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async getAll(req, res) {
    try {
      const result = await ProductService.getAll(req.params.type);
      res.json(result);
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async deleteOne(req, res) {
    try {
      const result = await ProductService.deleteOne(req.params.type, req.params.id);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async deleteAll(req, res) {
    try {
      const result = await ProductService.deleteAll(req.params.type);
      res.json({ success: true, deletedCount: result.deletedCount });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  // ------------------ ORDER ------------------

  static async createOrder(req, res) {
    try {
      const order = await ProductService.saveOne("order", req.body);
      res.status(201).json({
        success: true,
        message: "Order placed successfully",
        order
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async getUserOrders(req, res) {
    try {
      const orders = await ProductService.getUserOrders(req.params.email);
      res.json({ success: true, orders });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async getAllOrders(req, res) {
    try {
      const orders = await ProductService.getAllOrders();
      res.json({ success: true, orders });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async deleteAllOrders(req, res) {
    try {
      const result = await ProductService.deleteAllOrders();
      res.json({ success: true, deletedCount: result.deletedCount });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = ProductController;
