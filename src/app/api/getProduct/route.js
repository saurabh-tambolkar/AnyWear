import Product from "../../../../models/Product";
import mongoDbConnect from "../../../../middleware/mongoose";
import { NextResponse } from "next/server";

export async function GET(req,res){
   try {
    mongoDbConnect();
    let product = await Product.find({})
    return NextResponse.json({result:product,success:true},{status:200})
    } catch (error) {
       return NextResponse.json({result:"cant get products.",success:false},{status:400})
    } 
}

