import mongoDbConnect from "../../../../middleware/mongoose";
import User from "../../../../models/User";
import { NextResponse } from "next/server";
let bcrypt=require("bcryptjs")

export async function POST(req,res){
    try{
    await mongoDbConnect();
    let payload = await req.json();
    let name = payload.name;
    let email= payload.email;
    let password= payload.password;
    const salt =await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(password,salt);
    let user = new User({
        name:name,
        email:email,
        password:securePassword
    });
    await user.save();
    return NextResponse.json({result:"signed up successfully",success:true},{status:200})
    }
    catch(err){
        return NextResponse.json({result:err,success:false},{status:400})
    }
}