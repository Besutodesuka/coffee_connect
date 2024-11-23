
import { NextResponse } from 'next/server'
import { connectMongoDB } from '../../../../../../lib/mongodb';
import Product from '../../../../../../models/product';

export async function POST(req) {
    // ref: https://masteringjs.io/tutorials/mongoose/find-like
    try {
        await connectMongoDB();
          // Set default values
        const { minPrice, maxPrice, quality } = await req.json();

         // Set default values and convert to numbers
        const minPriceNum = Number(minPrice);//minPrice != null ?
        const maxPriceNum = Number(maxPrice);
        const qualityNum = Number(quality);

        // Build the price query
        const priceQuery = {};
        if (!isNaN(minPriceNum) && minPriceNum > 0) {
            priceQuery.$gte = minPriceNum;
        }
        // if price is not null 
        if (!isNaN(maxPriceNum) && maxPriceNum != 0) {
            priceQuery.$lte = maxPriceNum;
        }

        // Build the main query object
        const query = {};

        if (Object.keys(priceQuery).length > 0) {
            query.price = priceQuery;
        }

        // Add quality filter if specified
        if (!isNaN(qualityNum) && qualityNum > 0) {
            query.grade = { $gte: qualityNum };
        }
        console.log(JSON.stringify(query));

        const products = await Product.find(
            query
        );//.limit(50);
        // console.log("Product found: ", products)
        return NextResponse.json({products:  products})

    } catch(error) {
        return NextResponse.json({ message: "An error occured while pull product datas." }, { status: 500 })
    }
}