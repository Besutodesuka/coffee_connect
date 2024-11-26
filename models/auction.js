// Import required modules
const mongoose = require("mongoose");
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
const Auction = mongoose.models.Auction || mongoose.model("Auction", auctionSchema);
export default Auction;