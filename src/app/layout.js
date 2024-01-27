'use client'
import React,{createContext} from 'react'
import { Carattere, Carlito, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useEffect, useState,useContext } from 'react'
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import metadata from './Demo'
import { useRouter } from 'next/navigation'
import { set } from 'mongoose'

const inter = Inter({ subsets: ['latin'] })

export const CartContext  = createContext();



export default function RootLayout({ children }) {

  const [cart,setCart] = useState({});
  const [subTotal,setSubTotal]=useState(0)
  const [auth,setAuth]=useState(false);

  const notify = () => toast.success('Added to cart!', {
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
  
  useEffect(()=>{
    try {
      if(localStorage.getItem("cart")){
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
  },[])


  let saveCart=(cart)=>{
    localStorage.setItem("cart",JSON.stringify(cart))
    let subt = 0;
    let keys = Object.keys(cart);
    for(let i=0;i<keys.length;i++){
      subt+=cart[keys[i]].price*cart[keys[i]].qty;
    }
    setSubTotal(subt)
    // console.log(subTotal)
  }

  const addToCart=(itemCode,qty,price,name,size,variant)=>{
    let newCart = cart;
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty+qty
    }
    else{
      newCart[itemCode] = {qty:1,price,name,size,variant}
    }
    setCart(newCart);
    saveCart(newCart)
    notify();
  }

  const removeFromCart=(itemCode,qty,price,name,size,variant)=>{
    let newCart = cart;
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty - qty
    }
    if(newCart[itemCode]["qty"]<=0){
      delete newCart[itemCode]
    }
    setCart(newCart);
    saveCart(newCart)
  }

  const clearCart=()=>{
    setCart({})
    saveCart({})
    console.log("cart is cleared")
  }

  let router = useRouter();
  const buyNow=(itemCode,qty,price,name,size,variant)=>{

    let newCart ={itemCode:{qty:1,price,name,size,variant}};
    setCart(newCart);
    saveCart(newCart)
    router.push('/pages/checkout');
  }

  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    subTotal,
    buyNow,
    auth,
    setAuth
  };
  

  return (
    <html lang="en">
      <head>
      <meta name="description" content={metadata.description} />
      <title>{metadata.title}</title>
      </head>
      <body className={inter.className}>
       <CartContext.Provider value={contextValue}>
       <Navbar cart={cart} auth={auth} setAuth={setAuth} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
        {children}
        <Footer/>
        <ToastContainer
  position="top-left"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
  transition={Bounce}  // Corrected syntax: use comma for property assignment
/>

       </CartContext.Provider>
      
        </body>
    </html>
  )
}
