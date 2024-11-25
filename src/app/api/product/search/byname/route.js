import { NextResponse } from 'next/server'
import { connectMongoDB } from '../../../../../../lib/mongodb';
import Product from '../../../../../../models/product';

export async function POST(req) {
    // ref: https://masteringjs.io/tutorials/mongoose/find-like
    try {

        await connectMongoDB();
        const { name } = await req.json();
        const products = await Product.find(
            { "product_name": { "$regex": {name}, "$options": "i" } },
            function(err,docs) { 

            } 
        );
        console.log("Product found: ", products.length)
        return NextResponse.json({ products: products})

    } catch(error) {
        return NextResponse.json({ message: "An error occured while pull product datas." }, { status: 500 })
    }
}
