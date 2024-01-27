import { NextResponse } from "next/server";

export function GET(res,req){
    return(
        NextResponse.json({pincode:[443302,411048,411045]},{status:"200"})
    )
}