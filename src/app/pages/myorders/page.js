"use client";
import React,{useEffect} from "react";
import mongoose from "mongoose";
import Order from "../../../../models/Order";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Page() {

    
    let userEmail = localStorage.getItem("userEmail")
    const router = useRouter();
    
    useEffect(() => {
    if(!userEmail){
        router.push('/pages/login')
    }
   
  }, []);

let getProducts = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    let orders = await Order.find({ email: userEmail });
    console.log(orders)
    
    return orders;
  };

  return (
    <>
      {!userEmail ? (
        <div className="mx-auto flex flex-col items-center justify-center w-full h-[50vh]">
            <h1 className="font-semibold text-2xl text-center">Login to see your Orders.</h1>
            <button className="bg-gray-800 text-white rounded w-20 h-10"><Link href="/pages/login">Log In</Link></button>
        </div>
      ) : (
        <div>
          <div className="container w-full  text-center ">
            <h1 className=" text-2xl my-10 font-bold"> My Orders.</h1>
            <div className="items flex justify-center">
              <table class="table-fixed w-2/3 overflow-hidden overflow-x-scroll px-4 ">
                <thead  className="border bg-gray-700 text-white  h-[50px]">
                  <tr className="p-5">
                    <th>No.</th>
                    <th>Song</th>
                    <th>Artist</th>
                    <th>Year</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>The Sliding Mr. Bones </td>
                    <td>Malcolm Lockyer</td>
                    <td>1961</td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
         )} 
    </>
  );
}

export default Page;
