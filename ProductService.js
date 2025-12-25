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
//     const gst = subtotal * 0.05; // 5% GST
//     const finalTotal = subtotal + gst - totalDiscount; // 🔴 REQUIRED FIELD

//     console.log("Final Total:", finalTotal); // debug log

//     // ✅ FIX: finalTotal is now included
//     return await Order.create({
//       email,
//       items,
//       subtotal,
//       totalDiscount,
//       gst,
//       finalTotal
//     });
//   }

// }

// module.exports = ProductService;

















const mongoose = require("mongoose");
const { Veg, Nonveg, Drink, Order } = require("./schema");
const User = require("./userSchema");

// Map type string → Mongoose models (collections)
const collectionMap = {
  veg: Veg,           // vegproducts
  nonveg: Nonveg,     // nonvegproducts
  drink: Drink,       // drinkproducts
  order: Order        // orders
};

class ProductService {
  // ==========================
  // GET MODEL (safe)
  // ==========================
  static getModel(type) {
    if (!type) throw new Error("Type is required");
    const key = type.trim().toLowerCase();
    const model = collectionMap[key];
    if (!model) throw new Error(`Invalid type: ${type}`);
    return model;
  }

  // ==========================
  // PRODUCT CRUD
  // ==========================
  static async saveOne(type, data) {
    // ❌ Prevent creating orders through saveOne
    if (type === "order") {
      throw new Error("Orders must be created using createOrder() to calculate finalTotal.");
    }

    const model = this.getModel(type);
    return await model.create(data);
  }

  static async saveAll(type, dataArray) {
    const model = this.getModel(type);
    if (!Array.isArray(dataArray)) throw new Error("Data must be an array");
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
    const deleted = await model.findByIdAndDelete(id);
    if (!deleted) throw new Error(`${type} not found`);
    return deleted;
  }

  static async deleteAll(type) {
    const model = this.getModel(type);
    return await model.deleteMany({});
  }

  // ==========================
  // ORDER SERVICES (FIXED)
  // ==========================
  static async createOrder(data) {
    const { email, items } = data;

    if (!email || !items || items.length === 0) {
      throw new Error("Email and items are required");
    }

    // ✅ Calculate subtotal
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const totalDiscount = 0;
    const gst = +(subtotal * 0.05).toFixed(2); // 5% GST rounded to 2 decimals
    const finalTotal = +(subtotal + gst - totalDiscount).toFixed(2); // 🔴 REQUIRED FIELD

    console.log("Final Total:", finalTotal); // debug log

    // ✅ Create order with finalTotal included
    return await Order.create({
      email,
      items,
      subtotal,
      totalDiscount,
      gst,
      finalTotal
    });
  }

  static async getAllOrders() {
    return await Order.find().sort({ date: -1 }).lean();
  }

  static async deleteAllOrders() {
    return await Order.deleteMany({});
  }

  static async getUserOrders(email) {
    if (!email) throw new Error("Email is required");
    return await Order.find({ email }).sort({ date: -1 }).lean();
  }
}

module.exports = ProductService;
