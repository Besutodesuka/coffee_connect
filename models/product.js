// import mongoose, { Schema } from "mongoose";
// const AutoIncrement = require('mongoose-sequence')(mongoose);

// from class diagram
// private supplier [PK]
// public name [PK]
// public grade
// public MeasureDate
// protected PreviewPicture
// public quantity
// public ExpirationDate
// protected Price

// const productSchema = new Schema(
//     {
//         supplier_id: {
//             type: Number,
//             required: true
//         },
//         product_name: {
//             type: String,
//             required: true
//         },
//         grade: {
//             type: Number,
//             required: true
//         },
//         quantity: {
//             type: Number,
//             required: true
//         },
//         price: {
//             type: Number,
//             required: true
//         },
//         measure_date: {
//             type: Date,
//             required: true
//         },
//         exp_date: {
//             type: Date,
//             required: true
//         },
//         // TODO:add pipeline support adding preview picture in the future
//         // TODO: if picture not found show the preview place holder instead
//         // !: ref https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/
//         // preview: {
//         //     type: Image,
//         //     required: false,
//         //     default: null
//         // },
//     },
//     { timestamps: true }
// );

// productSchema.plugin(AutoIncrement, { inc_field: 'productid' });

// const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
// export default Product;

import mongoose, { Schema } from "mongoose";
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Updated product schema
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
            enum: ['Arabica', 'Robusta'], // Limit values to specific types
            required: true
        },
        region: {
            type: String,
            enum: ['Northern', 'Northeastern', 'Eastern', 'Central', 'Western', 'Southern'], // Limit to specified regions
            required: true
        },
        soil_type: {
            type: String,
            enum: ['Peat-based Soil', 'Coconut Coir', 'Compost', 'Sand-Based Soil'], // Limit to specified soil types
            required: true
        }
    },
    { timestamps: true }
);

// Add auto-increment for product ID
productSchema.plugin(AutoIncrement, { inc_field: 'productid' });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
