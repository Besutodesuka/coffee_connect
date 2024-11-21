import mongoose, { Schema } from "mongoose";
const AutoIncrement = require('mongoose-sequence')(mongoose);

// from class diagram
// private supplier [PK]
// public name [PK]
// public grade
// public MeasureDate
// protected PreviewPicture
// public quantity
// public ExpirationDate
// protected Price

const productSchema = new Schema(
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
        // TODO:add pipeline support adding preview picture in the future
        // TODO: if picture not found show the preview place holder instead
        preview: {
            type: Image,
            required: false
        },
    },
    { timestamps: true }
);

productSchema.plugin(AutoIncrement, { inc_field: 'productid' });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
