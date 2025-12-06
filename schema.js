const mongoose = require("mongoose");

// ==========================
// VEG PRODUCTS
// ==========================
const vegSchema = new mongoose.Schema({
  name: { type: String, required: true },
  des: String,
  price: Number,
  image: String
}, { timestamps: true });

const Veg = mongoose.model("Veg", vegSchema, "vegproducts");

// ==========================
// NONVEG PRODUCTS
// ==========================
const nonvegSchema = new mongoose.Schema({
  name: { type: String, required: true },
  des: String,
  price: Number,
  image: String
}, { timestamps: true });

const Nonveg = mongoose.model("Nonveg", nonvegSchema, "nonvegproducts");

// ==========================
// DRINK / MILK PRODUCTS
// ==========================
const drinkSchema = new mongoose.Schema({ // Renamed schema variable for clarity
 name: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
  img: { type: String }
}, { timestamps: true, strict: true });

// ✅ CHANGED: Renamed model variable from 'Milk' to 'Drink'
const Drink = mongoose.model("Drink", drinkSchema, "drinkproducts"); 

// ==========================
// ORDER SCHEMA
// ==========================
const OrderSchema = new mongoose.Schema({
  email: { type: String, required: true },

  items: [
    {
      id: { type: String, required: true },
      name: String,
      price: Number,
      quantity: { type: Number, default: 1 },
      image: String
    }
  ],

  subtotal: Number,
  totalDiscount: { type: Number, default: 0 },
  gst: { type: Number, default: 0 },
  finalTotal: Number,
  date: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", OrderSchema, "orders");

// ==========================
// EXPORT MODELS
// ==========================
module.exports = {
  Veg,
  Nonveg,
  // ✅ CHANGED: Exporting 'Drink' instead of 'Milk'
  Drink,
  Order
};
