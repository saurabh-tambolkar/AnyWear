// const https = require("https");
// const PaytmChecksum = require("PaytmChecksum");
// import mongoDbConnect from "../../../../middleware/mongoose";
// import Order from "../../../../models/Order";

// export async function POST(req,res){
//     let payload = await req.json();

//     let order = new Order({
//         email:payload.email,
//         orderid:payload.oID,
//         address:payload.address,
//         ammount:payload.subTotal,
//     })
//     await order.save()

//     var paytmParams = {};

// paytmParams.body = {
//   requestType: "Payment",
//   mid: process.env.PAYTM_MID,
//   websiteName: "YOUR_WEBSITE_NAME",
//   orderId: req.body.oID,
//   callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
//   txnAmount: {
//     value: req.body.subTotal,
//     currency: "INR",
//   },
//   userInfo: {
//     custId: req.body.email,
//   },
// };


// let checksum=await PaytmChecksum.generateSignature(
//   JSON.stringify(paytmParams.body),
//   process.env.PAYTM_MID
// )
//   paytmParams.head = {
//     signature: checksum,
//   };

//   var post_data = JSON.stringify(paytmParams);

//   const requestAsync=()=>{
//     return new Promise((resolve,reject)=>{
//         var options = {
//             /* for Staging */
//             // hostname: "securegw-stage.paytm.in" 
//             /* for Production */
//             hostname: 'securegw.paytm.in',
        
//             port: 443,
//             path: `/theia/api/v1/initiateTransaction?mid=${process.env.PAYTM_MID}&orderId=${req.body.oID}`,
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               "Content-Length": post_data.length,
//             },
//           };
        
//           var response = "";
//           var post_req = https.request(options, function (post_res) {
//             post_res.on("data", function (chunk) {
//               response += chunk;
//             });
        
//             post_res.on("end", function () {
//               console.log("Response: ", response);
//               resolve(response)
//             });
//           });
        
//           post_req.write(post_data);
//           post_req.end();
//     })
//   }

//   let myr = await requestAsync();
//   return NextResponse.json({result:myr})

// }