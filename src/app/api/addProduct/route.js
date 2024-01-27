import { NextResponse } from "next/server";
import mongoDbConnect from "../../../../middleware/mongoose";
import Product from "../../../../models/Product";

export async function POST(req,res){
    try{
        await mongoDbConnect();
        let payload = await req.json()
        const product = new Product(payload);
        await product.save();
        return NextResponse.json({result:"product added sucessfully"},{status:200})
    }
    catch(err){
        console.log(err)
        return NextResponse.json({result:"cant add product right now",err},{status:400})
    }
}