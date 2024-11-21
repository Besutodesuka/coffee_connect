// Import required modules
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: "../.env" }); // Load environment variables

// MongoDB connection URI
// const dbURI = process.env.MONGO_URI || "mongodb://admin:admin@localhost:27017/coffee?authSource=admin";

// Define Mongoose schemas
const supplierSchema = new mongoose.Schema(
  {
      supplier_id: {
          type: Number,
          unique: true
      },
      supplier_name: {
          type: String,
          required: true
      },
      phone: {
          type: Number,
          validate: {
            // Validate 10-digit phone numbers
            validator: function(v) {
              return /^\d{10}$/.test(v); // Corrected regex: Matches exactly 10 digits
            },
            message: '{VALUE} is not a valid 10-digit number!'
          }
      },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
      supplier_id: {
          type: Number,
          required: true
      },
      product_name: {
          type: String,
          required: true
      },
      grade: {
          type: Number,
          required: true
      },
      quantity: {
          type: Number,
          required: true
      },
      price: {
          type: Number,
          required: true
      },
      measure_date: {
          type: Date,
          required: true
      },
      exp_date: {
          type: Date,
          required: true
      },
  },
  { timestamps: true }
);
const Supplier = mongoose.model("Supplier", supplierSchema);
const Product = mongoose.model("Product", productSchema);

async function importData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      "mongodb://admin:admin@localhost:27017/coffee?authSource=admin", 
    //   { 
    //   user: process.env.MONGODB_USER || "admin",
    //   pass: process.env.MONGODB_PASSWORD || "pass"
    // }
  );
    console.log('Connected to MongoDB');

    // Import supplier data
    const suppliersFilePath = path.join(process.cwd(), "mockup_data", "supplier.json");
    const supplierData = JSON.parse(fs.readFileSync(suppliersFilePath, "utf8"));
    await Supplier.deleteMany({});
    await Supplier.insertMany(supplierData);
    console.log("Supplier data imported successfully.");

    // Import product data
    const productsFilePath = path.join(process.cwd(), "mockup_data", "product.json");
    const productData = JSON.parse(fs.readFileSync(productsFilePath, "utf8"));
    await Product.deleteMany({});
    await Product.insertMany(productData);
    console.log("Product data imported successfully.");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error during data import:", error.message);
    mongoose.connection.close();
    process.exit(1);
  }
}

// Execute the script
importData();
