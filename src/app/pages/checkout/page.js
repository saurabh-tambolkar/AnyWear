'use client'
import React, { useContext,useState } from "react";
import { CiCirclePlus, } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import Link from "next/link";
import { CartContext } from "@/app/layout";
import { ImCross } from "react-icons/im";
import { IoBagCheck } from "react-icons/io5";
import Head from "next/head";
import Script from "next/script";

function Page() {

  
  const [name, setname] = useState();
  const [email, setEmail] = useState();
  const [contact, setcontact] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [pinCode, setPinCode] = useState();
  const [disabled, setDisabled] = useState(false)

  let handleOnChange=(e)=>{
    if(e.target.name=="name"){
      setname(e.target.value);
    }
    else if(e.target.name=="email"){
      setEmail(e.target.value);
    }
    else if(e.target.name=="address"){
      setAddress(e.target.value);
    }
    else if(e.target.name=="contact"){
      setContact(e.target.value);
    }
    else if(e.target.name=="pincode"){
      setPinCode(e.target.value);
    }
    
    setTimeout(() => {
      console.log("setfdfsj")
      if(name && email && contact && address && pinCode && city && state){
        setDisabled(false)
      }
      else{
        setDisabled(true)
      }
    }, 5000);
  }

  let {cart,clearCart,addToCart,subTotal,removeFromCart} = useContext(CartContext)

  // let initiatePayment =async()=>{

  //   let oID = Math.floor(Math.random() * Date.now())

  //   let data={cart,subTotal,oID,email:email,name,address,pinCode,contact}
  //   let result=await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`,{
  //     method:"POST",
  //     headers:{'Content-Type':'application/json'},
  //     body:JSON.stringify({data})
  //   })
  //   let txnToken= await result.json();
  //   console.log(txnToken)

  //   var config = {
  //     "root": "",
  //     "flow": "DEFAULT",
  //     "data": {
  //     "orderId": oID, /* update order id */
  //     "token": txnToken, /* update token value */
  //     "tokenType": "TXN_TOKEN",
  //     "amount": subTotal /* update amount */
  //     },
  //     "handler": {
  //     "notifyMerchant": function(eventName,data){
  //     console.log("notifyMerchant handler function called");
  //     console.log("eventName => ",eventName);
  //     console.log("data => ",data);
  //     }
  //     }
  //     };
      
  //     window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
  //     // after successfully updating configuration, invoke JS Checkout
  //     window.Paytm.CheckoutJS.invoke();
  //     }).catch(function onError(error){
  //     console.log("error => ",error);
  //     });
      
  // }

  return (
    <div className="container mx-auto">
      <Head>
      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
      </Head>
      <Script type="application/javascript" src={`${process.env.PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.PAYTM_MID}.js`} onload="onScriptLoad();" crossorigin="anonymous"></Script>
      <h1 className="font-bold text-2xl text-center my-5">Checkout</h1>
      <hr />
      <div className="delivery container m-10 ">
      <h3 className="font-bold text-xl">Delivery details</h3>
      <div className="container mx-auto w-full space-x-0 md:space-x-3  flex md:flex-wrap flex-col md:flex-row md:mx-20">
        <div class="mb-4 w-2/3 md:w-1/4 ">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">
            Name
          </label>
          <input
            type="name"
            value={name}
            onChange={handleOnChange}
            id="name"
            name="name"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div class=" mb-4 w-2/3 md:w-1/4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={handleOnChange}
            id="email"
            name="email"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div class=" mb-4 w-2/3 md:w-1/4">
          <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
            Contact
          </label>
          <input
            type="phone"
            value={contact}
            onChange={handleOnChange}
            id="phone"
            name="phone"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div class=" mb-4 w-2/3 md:mx-20">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            Address
          </label>
          <textarea style={{resize:"none"}}
          onChange={handleOnChange} cols={20} rows={1} value={address} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
      </div>
      <div className="container mx-auto w-full space-x-0 md:space-x-3 flex flex-wrap flex-col md:flex-row md:mx-20">
      <div class=" mb-4 w-2/3 md:w-1/4">
          <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">
            Pincode
          </label>
          <input
            type="pincode"
            value={pinCode}
            onChange={handleOnChange}
            id="pincode"
            name="pincode"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div class="mb-4 w-2/3 md:w-1/4">
          <label htmlFor="city" className="leading-7 text-sm text-gray-600">
            city
          </label>
          <input
            type="city"
            value={city}
            id="city"
            name="city"
            readOnly={true}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div class=" mb-4 w-2/3 md:w-1/4">
          <label htmlFor="state" className="leading-7 text-sm text-gray-600">
            State
          </label>
          <input
            type="state"
            value={state}
            readOnly={true}
            id="state"
            name="state"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        
      </div>
      </div>

      <hr />

      <h1 className="font-bold text-2xl m-10">Review cart items</h1>
      <div className="sideCart container mx-auto h-auto md:w-1/2 w-full lg:w-1/2 rounded-lg text- p-10 ">
          
          
          <ol className='list-decimal text-gray-800 '>
           
            {
            Object.keys(cart).length === 0 ? (
              <div className="flex flex-col justify-center items-center mt-5">
                <h1 className='font-bold '>Oops , no items added</h1>
                <p className='text-xs'>Add few items to checkout</p>
              </div>
           ) : (
              Object.keys(cart).map((k) => (
                 <li className="w-1/2 mx-auto" key={k}>
                    <div className='flex mx-auto'>
                       <div className='w-1/2 text-gray-800 font-semibold'>{cart[k].name}</div>
                       <div className='w-2/3 space-x-2 text-gray-800 font-semibold'>({cart[k].size}/{cart[k].variant})</div>
                       <div className='w-2/3 text-gray-800 font-semibold'>₹{cart[k].price}</div>
                       <div className='flex justify-center align-center w-1/3 h-1 '>
                          <CiCircleMinus onClick={()=>{removeFromCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].variant)}} className='mx-1 text-2xl' />
                          {cart[k].qty}
                          <CiCirclePlus  onClick={()=>{addToCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].variant)}} className='mx-1 text-2xl' />
                       </div>
                    </div>
                 </li>
              ))
           )}
           
           
            
          </ol>
          <div className='flex w-full justify-center'>
          {/* onClick={initiatePayment}  */}
          <button className="w-auto font-semibold h-1/2 flex mx-auto mt-16 text-white bg-green-600 disabled:bg-green-400 border-0 py-2 px-6 focus:outline-none hover:bg-green-700 rounded text-lg " disabled={disabled} >Pay ₹{subTotal} <IoBagCheck className=' ml-3 text-2xl'/></button>
          <button className="w-36 font-semibold h-1/2 flex mx-auto mt-16 text-white bg-red-600 border-0 py-2 px-8 focus:outline-none hover:bg-red-700 rounded text-lg " onClick={clearCart}>Empty <ImCross className=' m-1 text-white'/></button>
          </div>
        
      </div>
    </div>
  );
}

export default Page;
