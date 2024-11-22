import { NextResponse } from 'next/server'
import { connectMongoDB } from '../../../../../../lib/mongodb';
import Product from '../../../../../../models/product';

export async function GET() {
    // ref: https://masteringjs.io/tutorials/mongoose/find-like
    try {

        await connectMongoDB();
        // const { name } = await req.json();
        const products = await Product.find(
            {}
        );//.limit(50);
        // console.log("Product found: ", products)
        return NextResponse.json({ products: products})

    } catch(error) {
        return NextResponse.json({ message: "An error occured while pull product datas." }, { status: 500 })
    }
}