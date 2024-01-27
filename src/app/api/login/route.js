import { NextResponse } from "next/server";
import mongoDbConnect from "../../../../middleware/mongoose";
import User from "../../../../models/User";
const bcrypt = require("bcryptjs")
let jwt = require("jsonwebtoken")

export async function POST(req,res){
    await mongoDbConnect();
    let payload = await req.json();
    let email = payload.email;
    let password = payload.password;
    if(!email || !password){
        return NextResponse.json({result:"Enter valid details",success:false},{status:400})
    }
    else{
        try {
            let user = await User.findOne({email:email})
            if(!user){
                return NextResponse.json({result:"No user found",success:false},{status:404})
            }
            else{
                let isMatched = await bcrypt.compare(password,user.password)
                if(isMatched){
                    const data={
                        user:{
                            id:user.id
                        }
                    }
                    let authToken = jwt.sign(data,process.env.SECRET_KEY)
                    return NextResponse.json({result:"Signed in successfully",authToken:authToken,success:true},{status:200})
                }
                else{
                    return NextResponse.json({result:"Wrong credentials entered",success:false},{status:404})
                }
            }
        } catch (error) {
            return NextResponse.json({result:error,success:false},{status:404})
        }
    }
}