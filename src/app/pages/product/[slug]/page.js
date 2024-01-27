"use client";
import React, { useState, useContext, useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";
import { CartContext } from "@/app/layout";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let Page = ({ params }) => {
  // console.log(params.slug);
  let url = params.slug;
  const parts = url.split("-");
  let cat = parts[0];
  let id = parts[1];
  // console.log(id);

  const { addToCart,buyNow } = useContext(CartContext);

  const notifyS = () =>
    toast.success("Yahoo,we deliver here.", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

  const notifyE = () =>
    toast.error("Sorry,we dont deliver here!", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

  const [service, setService] = useState();
  const [pin, setPin] = useState();
  const checkServicePincode = async () => {
    let pins = await fetch("http://localhost:3000/api/pincode", {
      method: "GET",
    });
    pins = await pins.json();
    pins = pins.pincode;
    console.log(pins, pin);
    if (pins.includes(parseInt(pin))) {
      setService(true);
      notifyS();
    } else {
      setService(false);
      notifyE();
    }
    // console.log(service);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    let getProduct = async () => {
      let response = await fetch(`/api/getProduct/${cat}-${id}`);
      response = await response.json();
      const result = response.result;
      let colArr=result[0].color.split(',')
      let szArr=result[0].size.split(',')
      setColor(colArr[0])
      setSize(szArr[0])
      setData(result);
    };

    getProduct();
  }, [cat, id]);
  // console.log(data)

  // let colArr=data[0].color.split(',')
  // console.log(colArr)
  const [color,setColor]=useState('select color')
  const [size,setSize]=useState('select size')
  

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          {
            data.map((prod)=>{
              let sizeArr=prod.size.split(',');
              let colorsArray = prod.color.split(',');
              return(
                <div key={prod._id} className="lg:w-4/5 mx-auto flex  flex-wrap justify-around align-center">
            <img
              style={{ width: "400px", height: "400px", objectFit: "contain" }}
              alt="ecommerce"
              className="lg:w-1/2  lg:h-auto h-full mt-5 object-cover object-center shadow-sm rounded"
              src={prod.image}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    BRAND NAME
                  </h2>
                  <h1 className="flex items-center  text-gray-900 text-3xl title-font font-medium mb-1">
                    {prod.title}  <p className="text-base mx-5">({size}/{color})</p>
                  </h1>
                </div>
                <div>
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 text-gray-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 text-gray-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 text-gray-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 text-gray-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 text-gray-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">
                {prod.desc}
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex items-center">
                  <span className="mr-3">Color</span>
                  {colorsArray.includes('black')&& <button onClick={()=>setColor('black')} className="border-2 border-gray-300  bg-gray-700 rounded-full w-4 h-4 focus:outline-none"></button> }
                  {colorsArray.includes('red')&&<button onClick={()=>setColor('red')} className="border-2 border-red-300 ml-1 bg-red-700 rounded-full w-4 h-4 focus:outline-none"></button>}
                  {colorsArray.includes('gray')&&<button onClick={()=>setColor('gray')} className="border-2 border-gray-300 ml-1 bg-gray-300 rounded-full w-4 h-4 focus:outline-none"></button>}
                  {colorsArray.includes("blue") && <button onClick={()=>setColor('blue')} className={`border-2 border-blue-300 ml-1 bg-blue-700 rounded-full w-4 h-4 focus:outline-none`}
                      ></button>}
                        {colorsArray.includes("white") && <button onClick={()=>setColor('white')} className={`border-2 border-gray-300 ml-1 bg-white-700 rounded-full w-4 h-4 focus:outline-none`}
                      ></button>}
                        {colorsArray.includes("green") && <button onClick={()=>setColor('green')} className={`border-2 border-green-300 ml-1 bg-green-700 rounded-full w-4 h-4 focus:outline-none`}
                      ></button>}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select onChange={(e)=>setSize(e.target.value)} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                      {
                        sizeArr.map((opt,index)=>{
                          return (
                            <option key={index} value={opt}>{opt}</option>
                          )
                        })
                      }
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ₹{prod.price}
                </span>
                <div className="buttons flex md:space-x-3 space-x-1">
                <button
                  onClick={() => {
                    buyNow(prod.slug, 1, prod.price,prod.title,size,color)
                  }}
                  className="flex ml-auto text-white bg-gray-800 shadow-md border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 rounded"
                >
                  Buy now 
                </button>
                <button
                  onClick={() => {
                    addToCart(prod.slug, 1, prod.price,prod.title,size,color);
                  }}
                  className="flex ml-auto text-white bg-gray-800 shadow-md border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 rounded"
                >
                  Add to Cart <IoCartOutline className=" ml-1 text-2xl" />
                </button>
                </div>
              </div>
              <div className="pincode flex justify-evenly py-5">
                <div className="py-2">
                  <span className="mr-3 py-2">Check if we can deliver :</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex ">
                    <input
                      type="text"
                      name="pin"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      className="border-2  mr-1 w-2/3 py-2 px-2 rounded shadow-md text-center"
                      placeholder="Enter pincode"
                    />
                    <button
                      onClick={checkServicePincode}
                      className="w-1/2 ml-0 text-white ml-1 bg-gray-800 border-0 py-2 px-6  focus:outline-none hover:bg-gray-700 rounded"
                    >
                      Check 
                    </button>
                  </div>
                  {!service && service != null && (
                    <p className="text-xs text-red-500  py-1 font-semibold">
                      "Sorry,we dont deliver here!"
                    </p>
                  )}
                  {service && service != null && (
                    <p className="text-xs text-green-500 py-1 font-semibold">
                      "Yahoo,we deliver here."
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
              )
            })
          }
        </div>
      </section>
    </div>
  );
};

export default Page;
