import { NextResponse } from "next/server";
import Product from "../../../../../models/Product";
import mongoose from 'mongoose';
import mongoDbConnect from "../../../../../middleware/mongoose";

export async function GET(req,res){
   
    let url=res.params.slug
   const parts = url.split('-');
   let cat=parts[0]
   let id=parts[1]
//    console.log(id)
    await mongoDbConnect()
    const product = await Product.find({category:cat,slug:id});
    // console.log(product.length)
    return NextResponse.json({result:product})
}