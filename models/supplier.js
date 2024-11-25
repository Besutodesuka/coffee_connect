import mongoose, { Schema } from "mongoose";
const AutoIncrement = require('mongoose-sequence')(mongoose);

// private Coffee_list [product]
// private inventory_location
// private phone number
// private name


const supplierSchema = new Schema(
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
                // validate 10 digits
                validator: function(v) {
                    return /d{10}/.test(v);
                },
                message: '{VALUE} is not a valid 10 digit number!'
            }
        },
        // TODO: make this geo-spartial ref https://medium.com/@allyearmustobey/geo-spatial-data-with-mongoose-b49a59503caa
        location: {
            type: String,
            required: false,
            default: null
        },
    },
    { timestamps: true }
);

supplierSchema.plugin(AutoIncrement, { inc_field: 'supplier_id' });

const supplier = mongoose.models.supplier || mongoose.model("supplier", supplierSchema);
export default supplier;