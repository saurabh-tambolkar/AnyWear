"use client";
import React, { useRef, useEffect, useState } from "react";
import logo from "../public/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { IoBagCheck } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { MdAccountCircle } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { FaDoorOpen } from "react-icons/fa";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar({
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
  auth,
  setAuth,
}) {
  // console.log(cart,addToCart, removeFromCart, clearCart, subTotal)
  let ref = useRef();
  const router = useRouter();

  const showCart = () => {
    // console.log("clicked");
    if (ref.current.classList.contains("invisible")) {
      ref.current.classList.remove("invisible");
      ref.current.classList.add("visible");
    } else if (!ref.current.classList.contains("invisible")) {
      ref.current.classList.remove("visible");
      ref.current.classList.add("invisible");
    }
  };

  const hideCart = () => {
    // console.log("clicked");
    if (ref.current.classList.contains("visible")) {
      ref.current.classList.remove("visible");
      ref.current.classList.add("invisible");
    } else if (!ref.current.classList.contains("visible")) {
      ref.current.classList.remove("invisible");
      ref.current.classList.add("visible");
    }
  };

  const notifyE = () =>
    toast.error("Logging Out!", {
      position: "top-left",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

  // const [auth,setAuth]=useState(false);

  useEffect(() => {
    const tok = localStorage.getItem("authToken");
    if (tok) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [auth]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    setAuth(false);
    notifyE();
    router.push('/')
  };

  const handleCheckout = () => {
    router.push("/pages/checkout");
    hideCart();
  };

  let prof = useRef();
  let handleProfile = () => {
    if (prof.current.classList.contains("invisible")) {
      prof.current.classList.remove("invisible");
      prof.current.classList.add("visible");
    } else {
      prof.current.classList.remove("visible");
      prof.current.classList.add("invisible");
    }
  };

  let handlePIC=()=>{
    if(localStorage.getItem('userEmail')){
      prof.current.classList.add("invisible")
    }
  }

  return (
    <div className="navbar sticky bg-white top-0 md:sticky  ">
      <div className="flex flex-col flex-wrap items-center justify-center md:flex-row md:items-center md:justify-between shadow-lg">
        <div className="flex items-center flex-col md:flex-row">
          <div className="logo mx-5 ">
            <Link href={"/"} style={{ cursor: "pointer" }}>
              <Image
                src={logo}
                style={{ width: "350px", height: "100px", objectFit: "cover" }}
              />
            </Link>
          </div>
          <div className="nav">
            <ul className="flex space-x-3 font-bold text-gray-600 text-s">
              <Link href={"/pages/tshirts"} onClick={handlePIC} >
                <li>Tshirts</li>
              </Link>
              <Link href={"/pages/mugs"} onClick={handlePIC}>
                <li>Mugs</li>
              </Link>
              <Link href={"/pages/hoodies"} onClick={handlePIC}>
                <li>Hoodies</li>
              </Link>
              <Link href={"/pages/stickers"} onClick={handlePIC}>
                <li>Stickers</li>
              </Link>
            </ul>
          </div>
        </div>
        {/* <div className="cart md:flex absolute right-0 top-5  m-2 mx-5 md:mx-10"> */}
        <div className="cart flex md:flex  m-2 mx-5 md:mx-10">
          {auth && (
            <div className="flex items-center">
              <button className="font-bold mx-5" onClick={handleProfile}>Profile</button>
              <div
                ref={prof}
                className="container text-white flex flex-col text-center items-center justify-center bg-gray-800 invisible md:h-[15vh] md:w-[10vw] w-1/2 h-1/2 rounded-lg absolute top-[21vh] left-[10vw] md:absolute md:top-[10vh] md:left-[80vw]"
              >
                
                <Link
                  href={"/pages/myaccount"}
                  className="w-full mr-2 text-sm py-1 font-semibold text-border-0 "
                  onClick={handlePIC}
                >
                  My Account
                </Link>
                <Link
                  href={"/pages/myorders"}
                  className="w-full mr-2 py-1 text-sm font-semibold text-border-0 "
                  onClick={handlePIC}
                >
                  My Orders
                </Link>
                <hr className="bg-red-600"/>
                <button
                  onClick={logoutHandler}
                  className="w-2/3  ml-0 text-white flex font-semibold bg-red-600 border-0 py-2 px-2 mb-1   focus:outline-none hover:bg-red-500 rounded"
                >
                  <p>Logout</p>
                  <FaDoorOpen className="text-2xl ml-2" />
                </button>
              </div>
            </div>
          )}

          {!auth && (
            <Link
              className="w-full ml-0 font-semibold text-white flex bg-gray-800 border-0 py-2 px-2 focus:outline-none hover:bg-gray-700 rounded"
              href="/pages/login"
            >
              Login
              <MdAccountCircle className="text-2xl mx-2" />
            </Link>
          )}
          <button
            onClick={showCart}
            className="md:w-[4.5vw] h-full md:h-1/4 sm:w-full flex items-center text-white ml-1 bg-gray-800 border-0 py-2 px-2  focus:outline-none hover:bg-gray-700 rounded"
          >
            Cart
            <FaCartShopping className="text-2xl m-1 md:text-xl" />
          </button>
        </div>

        <div
          ref={ref}
          className="sideCart absolute md:w-100vw  h-auto overflow-y-scroll rounded-lg top-0 right-0 bg-gray-800 text- p-10 invisible  "
        >
          <h3 className="font-bold text-xl text-white text-center">
            Shopping cart
          </h3>
          <p className="text-xs text-gray-300 text-center mb-3">AnyWear.com</p>
          <hr className="mb-3" />
          <span
            onClick={hideCart}
            className="absolute top-3 text-white right-2 text-2xl md:text-3xl cursor-pointer"
          >
            <IoIosCloseCircle />
          </span>
          <ol className="list-decimal text-neutral-300 overflow-y-scrol">
            {Object.keys(cart).length === 0 ? (
              <div className="flex flex-col justify-center items-center mt-5">
                <h1 className="font-bold ">Oops , no items added</h1>
                <p className="text-xs">Add few items to checkout</p>
              </div>
            ) : (
              Object.keys(cart).map((k) => (
                <li key={k}>
                  <div className="flex space-x-1">
                    <div className="w-2/3 text-neutral-300 font-semibold">
                      {cart[k].name}
                    </div>
                    <div className="w-2/3 text-xs space-x-2 text-neutral-300 font-semibold">
                      ({cart[k].size}/{cart[k].variant})
                    </div>
                    <div className="w-2/3 text-neutral-300 font-semibold">
                      ₹{cart[k].price}
                    </div>
                    <div className="flex justify-center align-center w-1/3 h-1 ">
                      <CiCircleMinus
                        onClick={() => {
                          removeFromCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className="mx-1 text-2xl"
                      />
                      {cart[k].qty}
                      <CiCirclePlus
                        onClick={() => {
                          addToCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className="mx-1 text-2xl"
                      />
                    </div>
                  </div>
                </li>
              ))
            )}
          </ol>

          <div className="text-white mt-20">Total : ₹{subTotal}/-</div>
          <div>
            <div className="flex space-x-1 ">
              <button
                className="w-1/2 h-1/2 flex mx-auto mt-16 text-white bg-green-600 border-0 py-2 px-6 focus:outline-none hover:bg-green-700 rounded text-lg "
                onClick={handleCheckout}
              >
                Checkout
                <IoBagCheck className=" ml-1 text-2xl" />
              </button>
              <button
                className="w-1/2 h-1/2 flex mx-auto mt-16 text-white bg-red-600 border-0 py-2 px-8 focus:outline-none hover:bg-red-700 rounded text-lg "
                onClick={clearCart}
              >
                Empty <ImCross className=" m-1 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Navbar;
