'use client'
import { CartContext } from '@/app/layout'
import React, { useContext } from 'react';
import { MdLocationOn } from "react-icons/md";

function Page() {

    const {subTotal} = useContext(CartContext);

  return (
    <div classNameName='Order'>
      <h1 className='text-3xl text-center my-5 font-bold'>Your Orders</h1>
      <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-5 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">ANYWEAR</h2> 
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id : #2209</h1>
        
        <p className="leading-relaxed mb-4 text-sm">Your order has been placed successfully.</p>
        <div class="flex mb-4">
          <a class="flex-grow py-2 text-lg px-1">Order description</a>
          <a class="flex-grow py-2 text-lg px-1">Size</a>
          <a class="flex-grow py-2 text-lg px-1">Price</a>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Color</span>
          <span className="ml-auto text-gray-900">Blue</span>
          <span className="ml-auto text-gray-900">1</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Size</span>
          <span className="ml-auto text-gray-900">Medium</span>
          <span className="ml-auto text-gray-900">1</span>
        </div>
        <div className="flex border-t border-b mb-6 border-gray-200 py-2">
          <span className="text-gray-500">Quantity</span>
          <span className="ml-auto text-gray-900">4</span>
          <span className="ml-auto text-gray-900">1</span>
        </div>
        <div className="flex">
          <span className="title-font font-medium text-2xl text-gray-900">₹{subTotal}</span>
          <button className="flex ml-auto text-white bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 rounded">Track order<MdLocationOn className='text-2xl mx-1'/></button>
        </div>
      </div>
      
    </div>
  </div>
</section>
    </div>
  )
}

export default Page
