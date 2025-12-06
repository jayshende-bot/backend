// const productSchema = require("./schema");
// const mongoose = require("mongoose");

// // Local array data
// let products = [
//   { id: 1, name: "Laptop", price: 45000 },
//   { id: 2, name: "Mobile", price: 20000 },
//   { id: 3, name: "Mouse", price: 300 }
// ];

// // Local functions
// const fetchAllProducts = () => products;

// const fetchProductById = (id) => products.find(p => p.id === id);

// const addNewProduct = (product) => {
//   products.push(product);
//   return product;
// };

// // Mongo Model
// const productModel = mongoose.model("NewProduct", productSchema);

// // DB Function
// const addProductToDB = async (newProduct) => {
//   try {
//     const product = new productModel(newProduct);
//     const saved = await product.save();
//     return saved;
//   } catch (err) {
//     console.log("Error saving:", err);
//     throw err;
//   }
// };

// module.exports = {
//   fetchAllProducts,
//   fetchProductById,
//   addNewProduct,
//   addProductToDB

// };// 
// // 
// const mongoose = require("mongoose");
// // ✅ CHANGED: Import 'Drink' instead of 'Milk'
// const { Veg, Nonveg, Drink, Order } = require("./schema");

// // Map type from URL to Mongoose model
// const collectionMap = {
//   veg: Veg,
//   nonveg: Nonveg,
//   // ✅ FIXED: Key is now 'drinks' to match the desired URL
//   drinks: Drink, 
//   order: Order
// };

// class ProductService {

//   // FIX: Added case normalization and error handling for invalid types
//   static getModel(type) {
//     if (!type) {
//         console.error("❌ Invalid type received: Null/Undefined");
//         throw new Error(`Invalid type: Null/Undefined`);
//     }

//     // Convert type to lowercase to ensure match with collectionMap keys
//     const normalizedType = type.toLowerCase(); 

//     const model = collectionMap[normalizedType];

//     if (!model) {
//       console.error("❌ Invalid type received:", type);
//       throw new Error(`Invalid type: ${type}. Model not found in collectionMap.`);
//     }

//     return model;
//   }

//   // ------------------ PRODUCT OPERATIONS ------------------

//   static async saveOne(type, data) {
//     try {
//         const model = this.getModel(type);
//         return await model.create(data);
//     } catch (err) {
//         console.error(`Error saving one product of type ${type}:`, err);
//         throw new Error(`Failed to save product: ${err.message}`);
//     }
//   }

//   static async saveAll(type, dataArray) {
//     try {
//         const model = this.getModel(type);

//         if (!Array.isArray(dataArray)) {
//           throw new Error("Data must be an array for saveAll");
//         }

//         return await model.insertMany(dataArray);
//     } catch (err) {
//         console.error(`Error saving all products of type ${type}:`, err); 
//         throw new Error(`Failed to save products: ${err.message}`);
//     }
//   }

//   static async getAll(type) {
//     try {
//         const model = this.getModel(type);
//         return await model.find().lean();
//     } catch (err) {
//         console.error(`Error fetching products of type ${type}:`, err);
//         throw new Error(`Failed to fetch products: ${err.message}`);
//     }
//   }

//   static async deleteOne(type, id) {
//     try {
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//           throw new Error("Invalid ID format");
//         }

//         const model = this.getModel(type);
//         return await model.findByIdAndDelete(id);
//     } catch (err) {
//         console.error(`Error deleting product of type ${type}:`, err);
//         throw new Error(`Failed to delete product: ${err.message}`);
//     }
//   }

//   static async deleteAll(type) {
//     try {
//         const model = this.getModel(type);
//         return await model.deleteMany({});
//     } catch (err) {
//         console.error(`Error deleting all products of type ${type}:`, err);
//         throw new Error(`Failed to delete all products: ${err.message}`);
//     }
//   }

//   // ------------------ ORDER OPERATIONS ------------------

//   static async getAllOrders() {
//     return await Order.find().sort({ createdAt: -1 }).lean();
//   }

//   static async deleteAllOrders() {
//     return await Order.deleteMany({});
//   }

//   // ✅ CHANGED: Using Order model directly, more efficient than calling getAll('order')
//   static async getUserOrders(email) {
//     return await Order.find({ email }).sort({ createdAt: -1 }).lean();
//   }
// }

// module.exports = ProductService;  



// const mongoose = require("mongoose");
// // ✅ Import
// const { Veg, Nonveg, Drink, Order } = require("./schema");
// const User = require("./userSchema");

// // =======================
// // FIXED TYPE MAP HERE 👇
// // =======================
// const collectionMap = {
//   veg: Veg,
//   nonveg: Nonveg,
//   drink: Drink,   // ✅ FIXED (changed from "drinks" → "drink")
//   order: Order
// };

// class ProductService {

//   static getModel(type) {
//     if (!type) {
//         throw new Error(`Invalid type: Null/Undefined`);
//     }

//     const normalizedType = type.toLowerCase();
//     const model = collectionMap[normalizedType];

//     if (!model) {
//       throw new Error(`Invalid type: ${type}. Model not found in collectionMap.`);
//     }

//     return model;
//   }

//   // PRODUCT CRUD ---------------------

//   static async saveOne(type, data) {
//     try {
//         const model = this.getModel(type);
//         return await model.create(data);
//     } catch (err) {
//         throw new Error(`Failed to save product: ${err.message}`);
//     }
//   }

//   static async saveAll(type, dataArray) {
//     try {
//         const model = this.getModel(type);

//         if (!Array.isArray(dataArray)) {
//           throw new Error("Data must be an array for saveAll");
//         }

//         return await model.insertMany(dataArray);
//     } catch (err) {
//         throw new Error(`Failed to save products: ${err.message}`);
//     }
//   }

//   static async getAll(type) {
//     try {
//         const model = this.getModel(type);
//         return await model.find().lean();
//     } catch (err) {
//         throw new Error(`Failed to fetch products: ${err.message}`);
//     }
//   }

//   static async deleteOne(type, id) {
//     try {
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//           throw new Error("Invalid ID format");
//         }

//         const model = this.getModel(type);
//         return await model.findByIdAndDelete(id);
//     } catch (err) {
//         throw new Error(`Failed to delete product: ${err.message}`);
//     }
//   }

//   static async deleteAll(type) {
//     try {
//         const model = this.getModel(type);
//         return await model.deleteMany({});
//     } catch (err) {
//         throw new Error(`Failed to delete all products: ${err.message}`);
//     }
//   }

//   // ORDER SERVICES ------------------

//   static async getAllOrders() {
//     return await Order.find().sort({ createdAt: -1 }).lean();
//   }

//   static async deleteAllOrders() {
//     return await Order.deleteMany({});
//   }

//   static async getUserOrders(email) {
//     return await Order.find({ email }).sort({ createdAt: -1 }).lean();
//   }
// }

// module.exports = ProductService;



const mongoose = require("mongoose");
const { Veg, Nonveg, Drink, Order } = require("./schema");
const User = require("./userSchema");

const collectionMap = {
  veg: Veg,
  nonveg: Nonveg,
  drink: Drink,
  order: Order
};

class ProductService {
  static getModel(type) {
    const model = collectionMap[type.toLowerCase()];
    if (!model) throw new Error(`Invalid type: ${type}`);
    return model;
  }

  static async saveOne(type, data) {
    const model = this.getModel(type);
    return await model.create(data);
  }

  static async saveAll(type, dataArray) {
    const model = this.getModel(type);
    if (!Array.isArray(dataArray)) throw new Error("Data must be array");
    return await model.insertMany(dataArray);
  }

  static async getAll(type) {
    const model = this.getModel(type);
    return await model.find().lean();
  }

  static async deleteOne(type, id) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new Error("Invalid ID");

    const model = this.getModel(type);
    return await model.findByIdAndDelete(id);
  }

  static async deleteAll(type) {
    const model = this.getModel(type);
    return await model.deleteMany({});
  }

  // ORDER SERVICES
  static async createOrder(data) {
    return await Order.create(data);
  }

  static async getAllOrders() {
    return await Order.find().sort({ createdAt: -1 }).lean();
  }

  static async deleteAllOrders() {
    return await Order.deleteMany({});
  }

  static async getUserOrders(email) {
    return await Order.find({ email })
      .sort({ createdAt: -1 })
      .lean();
  }
}

module.exports = ProductService;
