

// const mongoose = require("mongoose");
// const { Veg, Nonveg, Drink, Order } = require("./schema");
// const User = require("./userSchema");

// // Map type string → Mongoose models (collections)
// const collectionMap = {
//   veg: Veg,           // vegproducts
//   nonveg: Nonveg,     // nonvegproducts
//   drink: Drink,       // drinkproducts
//   order: Order        // orders
// };

// class ProductService {
//   // ==========================
//   // GET MODEL (safe)
//   // ==========================
//   static getModel(type) {
//     if (!type) throw new Error("Type is required");
//     const key = type.trim().toLowerCase();
//     const model = collectionMap[key];
//     if (!model) throw new Error(`Invalid type: ${type}`);
//     return model;
//   }

//   // ==========================
//   // PRODUCT CRUD
//   // ==========================
//   static async saveOne(type, data) {
//     // ❌ Prevent creating orders through saveOne
//     if (type === "order") {
//       throw new Error("Orders must be created using createOrder() to calculate finalTotal.");
//     }

//     const model = this.getModel(type);
//     return await model.create(data);
//   }

//   static async saveAll(type, dataArray) {
//     const model = this.getModel(type);
//     if (!Array.isArray(dataArray)) throw new Error("Data must be an array");
//     return await model.insertMany(dataArray);
//   }

//   static async getAll(type) {
//     const model = this.getModel(type);
//     return await model.find().lean();
//   }

//   static async deleteOne(type, id) {
//     if (!mongoose.Types.ObjectId.isValid(id))
//       throw new Error("Invalid ID");
//     const model = this.getModel(type);
//     const deleted = await model.findByIdAndDelete(id);
//     if (!deleted) throw new Error(`${type} not found`);
//     return deleted;
//   }

//   static async deleteAll(type) {
//     const model = this.getModel(type);
//     return await model.deleteMany({});
//   }

//   // ==========================
//   // ORDER SERVICES (FIXED)
//   // ==========================
//   static async createOrder(data) {
//     const { email, items } = data;

//     if (!email || !items || items.length === 0) {
//       throw new Error("Email and items are required");
//     }

//     // ✅ Calculate subtotal
//     const subtotal = items.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );

//     const totalDiscount = 0;
//     const gst = +(subtotal * 0.05).toFixed(2); // 5% GST rounded to 2 decimals
//     const finalTotal = +(subtotal + gst - totalDiscount).toFixed(2); // 🔴 REQUIRED FIELD

//     console.log("Final Total:", finalTotal); // debug log

//     // ✅ Create order with finalTotal included
//     return await Order.create({
//       email,
//       items,
//       subtotal,
//       totalDiscount,
//       gst,
//       finalTotal
//     });
//   }

//   static async getAllOrders() {
//     return await Order.find().sort({ date: -1 }).lean();
//   }

//   static async deleteAllOrders() {
//     return await Order.deleteMany({});
//   }

//   static async getUserOrders(email) {
//     if (!email) throw new Error("Email is required");
//     return await Order.find({ email }).sort({ date: -1 }).lean();
//   }
// }

// module.exports = ProductService;



const mongoose = require("mongoose");
const connectDB = require("./db");

const { Veg, Nonveg, Drink, Order } = require("./schema");

// ==========================
// MAP TYPE → MODEL
// ==========================
const collectionMap = {
  veg: Veg,
  nonveg: Nonveg,
  drink: Drink,
  order: Order
};

class ProductService {

  // ==========================
  // GET MODEL
  // ==========================
  static getModel(type) {
    if (!type) throw new Error("Type is required");
    const key = type.toLowerCase();
    const model = collectionMap[key];
    if (!model) throw new Error(`Invalid type: ${type}`);
    return model;
  }

  // ==========================
  // PRODUCTS
  // ==========================
  static async getAll(type) {
    await connectDB(); // ✅ REQUIRED
    const model = this.getModel(type);
    return await model.find().lean();
  }

  static async saveOne(type, data) {
    await connectDB(); // ✅ REQUIRED
    if (type === "order") throw new Error("Use createOrder API");
    const model = this.getModel(type);
    return await model.create(data);
  }

  static async saveAll(type, dataArray) {
    await connectDB(); // ✅ REQUIRED
    if (!Array.isArray(dataArray)) throw new Error("Data must be array");
    const model = this.getModel(type);
    return await model.insertMany(dataArray);
  }

  static async deleteOne(type, id) {
    await connectDB(); // ✅ REQUIRED
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID");
    }
    const model = this.getModel(type);
    const deleted = await model.findByIdAndDelete(id);
    if (!deleted) throw new Error("Item not found");
    return deleted;
  }

  static async deleteAll(type) {
    await connectDB(); // ✅ REQUIRED
    const model = this.getModel(type);
    return await model.deleteMany({});
  }

  // ==========================
  // ORDERS
  // ==========================
  static async createOrder(data) {
    await connectDB(); // ✅ REQUIRED

    const { email, items } = data;
    if (!email || !Array.isArray(items) || items.length === 0) {
      throw new Error("Email and items are required");
    }

    const subtotal = items.reduce(
      (sum, i) => sum + (i.price || 0) * (i.quantity || 0),
      0
    );

    const gst = +(subtotal * 0.05).toFixed(2);
    const finalTotal = +(subtotal + gst).toFixed(2);

    return await Order.create({
      email,
      items,
      subtotal,
      gst,
      finalTotal
    });
  }

  static async getAllOrders() {
    await connectDB(); // ✅ REQUIRED
    return await Order.find().sort({ createdAt: -1 }).lean();
  }

  static async getUserOrders(email) {
    await connectDB(); // ✅ REQUIRED
    if (!email) throw new Error("Email required");
    return await Order.find({ email }).sort({ createdAt: -1 }).lean();
  }

  static async deleteAllOrders() {
    await connectDB(); // ✅ REQUIRED
    return await Order.deleteMany({});
  }
}

module.exports = ProductService;
