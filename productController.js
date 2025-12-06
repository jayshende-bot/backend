// // const { fetchAllProducts, fetchProductById, addNewProduct } = require("./productService");

// // const getAllProducts = (req, res) => {
// //   const products = fetchAllProducts();
// //   res.send(products);
// // };

// // const getProductsById = (req, res) => {
// //   const productId = parseInt(req.params.id);
// //   const product = fetchProductById(productId);
// //   res.send(product);
// // };

// // const addProduct = (req, res) => {
// //   const newProduct = req.body;
// //   const added = addNewProduct(newProduct);
// //   res.send({
// //     message: "Product added successfully",
// //     product: added
// //   });
// // };


// // module.exports = {
// //   getAllProducts,
// //   getProductsById,
// //   addProduct
// // };  const { addProduct } = require("./productService");const { fetchAllProducts, fetchProductById, addNewProduct, addProductTODB } = require("./productService");
// // In-memory product arrayconst { addProduct, getAllProducts, getProductById } = require("./ProductService");

// // Add Product

// const {
//   fetchAllProducts,
//   fetchProductById,
//   addNewProduct,
//   addProductToDB
// } = require("./productService");

// const getAllProducts = (req, res) => {
//   res.json(fetchAllProducts());
// };

// const getProductByIdController = (req, res) => {
//   const id = parseInt(req.params.id);
//   res.json(fetchProductById(id));
// };

// const addProductLocal = (req, res) => {
//   const result = addNewProduct(req.body);
//   res.json({ message: "Added to local array", result });
// };

// const addProductDB = async (req, res) => {
//   try {
//     const result = await addProductToDB(req.body);
//     res.json({ message: "Saved to MongoDB", result });
//   } catch (error) {
//     res.status(500).json({ error: "DB insert failed" });
//   }
// };

// module.exports = {
//   getAllProducts,
//   getProductByIdController,
//   addProductLocal,
//   addProductDB
// };






// const {
//   addProductToDB,
//   getAllProductsFromDB,
//   getProductByIdFromDB,
//   updateProductInDB,
//   deleteProductFromDB,
//   saveAllProductsToDB       // ✔ added
// } = require("./productService");


// // Create product
// const addProductDB = async (req, res) => {
//   try {
//     const result = await addProductToDB(req.body);
//     res.json({ message: "Product added", result });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get all products
// const getAllProductsController = async (req, res) => {
//   try {
//     const products = await getAllProductsFromDB();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get product by ID
// const getProductByIdController = async (req, res) => {
//   try {
//     const product = await getProductByIdFromDB(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update product
// const updateProductController = async (req, res) => {
//   try {
//     const product = await updateProductInDB(req.params.id, req.body);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.json({ message: "Product updated", product });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete product
// const deleteProductController = async (req, res) => {
//   try {
//     const product = await deleteProductFromDB(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.json({ message: "Product deleted", product });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
// // Create - Multiple (Save All)
// const saveAllProductsController = async (req, res) => {
//   try {
//     const result = await saveAllProductsToDB(req.body);
//     res.json({ message: "All products saved", result });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// module.exports = {
//   addProductDB,
//   getAllProductsController,
//   getProductByIdController,
//   updateProductController,
//   deleteProductController,
//   saveAllProductsController   // ✔ added
// };const ProductService = require("./ProductService");

// const ProductService = require("./productService");

// class ProductController {

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

//   // ✅ FIXED: Always return pure array for frontend
//   static async getAll(req, res) {
//     try {
//       const result = await ProductService.getAll(req.params.type);

//       // IMPORTANT: return only array
//       res.json(result);

//     } catch (err) {
//       res.status(500).json({ success: false, error: err.message });
//     }
//   }

//   static async deleteOne(req, res) {
//     try {
//       const result = await ProductService.deleteOne(req.params.type, req.params.id);
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
// }

// module.exports = ProductController;

const ProductService = require("./ProductService");
const User = require("./userSchema");
const { Veg, Nonveg, Drink, Order } = require("./schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



class ProductController {

  // REGISTER
  static async register(req, res) {
    try {
      const { name, email, password, phone, address } = req.body;

      const exists = await User.findOne({ email });
      if (exists)
        return res.status(400).json({
          success: false,
          message: "Email already registered"
        });

      const user = await User.create({
        name,
        email,
        password,
        phone,
        address
      });

      res.status(201).json({
        success: true,
        message: "Registration successful",
        user
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
  // ------------------ LOGIN ------------------
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // 1. Check user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      // 2. Compare password (simple compare like reference)
      const isValid = password === user.password;
      if (!isValid) {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password"
        });
      }

      // 3. Generate token
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET || "MY_SECRET_KEY",
        {
          expiresIn: process.env.JWT_EXPIRES_IN || "7d"
        }
      );

      return res.json({
        success: true,
        message: "Login successful",
        token,
        user
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }


  // ------------------ PRODUCT ------------------

  static async saveOne(req, res) {
    try {
      const result = await ProductService.saveOne(req.params.type, req.body);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async saveAll(req, res) {
    try {
      const result = await ProductService.saveAll(req.params.type, req.body);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getAll(req, res) {
    try {
      const result = await ProductService.getAll(req.params.type);
      res.json(result);
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async deleteOne(req, res) {
    try {
      const result = await ProductService.deleteOne(
        req.params.type,
        req.params.id
      );
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async deleteAll(req, res) {
    try {
      const result = await ProductService.deleteAll(req.params.type);
      res.json({ success: true, deletedCount: result.deletedCount });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
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
