import { NextResponse } from 'next/server'
import { connectMongoDB } from '../../../../../../lib/mongodb';
import Auction from '../../../../../../models/auction';

export async function GET() {
    // ref: https://masteringjs.io/tutorials/mongoose/find-like
    try {

        await connectMongoDB();
        // const { name } = await req.json();
        const auction = await Auction.find(
            {}
        );//.limit(50);
        // console.log("Product found: ", products)
        return NextResponse.json({ Auction: auction})

    } catch(error) {
        return NextResponse.json({ message: "An error occured while pull product datas." }, { status: 500 })
    }
}