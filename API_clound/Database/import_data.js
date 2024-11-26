// Import required modules
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: "../.env" }); // Load environment variables
const AutoIncrement = require('mongoose-sequence')(mongoose);
// MongoDB connection URI
// const dbURI = process.env.MONGO_URI || "mongodb://admin:admin@localhost:27017/coffee?authSource=admin";
const auctionSchema = new mongoose.Schema(
  {
    productid: {
      type: Number,
      required: true
    },
    StartDate: {
      type: Date,
      required: true
    },
    EndDate: {
      type: Date,
      required: true
    },
    CurrentBid: {
      type: Number,
      required: true,
      min: 0 // Assuming the bid cannot be negative
    }
  },
  { timestamps: true }
);

auctionSchema.plugin(AutoIncrement, { inc_field: 'auctionid' });


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

supplierSchema.plugin(AutoIncrement, { inc_field: 'supplier_id' });

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
  description: {
      type: String,
      required: true
  },
  weight: {
      type: Number,
      required: true
  },
  bean_type: {
      type: String,
      required: true
  },
  region: {
      type: String,
      required: true
  },
  soil_type: {
      type: String,
      required: true
  }
},
{ timestamps: true }
);

productSchema.plugin(AutoIncrement, { inc_field: 'productid' });

const Supplier = mongoose.model("Supplier", supplierSchema);
const Product = mongoose.model("Product", productSchema);
const Auction = mongoose.model("Auction", auctionSchema);

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

    // Import product data
    const auctionFilePath = path.join(process.cwd(), "mockup_data", "auction.json");
    const auctionData = JSON.parse(fs.readFileSync(auctionFilePath, "utf8"));
    await Auction.deleteMany({});
    await Auction.insertMany(auctionData);
    console.log("Auction data imported successfully.");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error during data import:", error.message);
    mongoose.connection.close();
    process.exit(1);
  }
}

// Execute the script
importData();
