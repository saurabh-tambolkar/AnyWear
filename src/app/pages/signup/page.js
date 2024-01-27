'use client'
import React, { useState } from 'react'
import Logo from '../../../../public/assets/logo.png'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Page() {

    const notifyS = () => toast.success("Signed up successfully", {
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

    const notifyE = () => toast.error('Enter valid details', {
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

    const [name,setName]= useState()    
    const [email,setEmail]= useState()    
    const [password,setPassword]= useState()    
    const [signUpText,setSignUpText] = useState("Sign Up")

    let router = useRouter();

    let handleChange=(e)=>{
        if(e.target.name=='name'){
            setName(e.target.value)
        }
        else if(e.target.name=='email'){
            setEmail(e.target.value)
        }
        else if(e.target.name=='password'){
            setPassword(e.target.value)
        }
    }

    let handleSubmit=async(e)=>{
        e.preventDefault();
        if(!name || !email || !password){
            notifyE();
            // console.log("enter valid details")
        }
        else{
        let formBody = {name,email,password};
        let result = await fetch(`${process.env.HOST}/api/signup`,{
            method:"POST",
            headers:{
                'Content-type':'application-json'
            },
            body:JSON.stringify(formBody)    
        })
        result = await result.json();
        if(result.success){
            notifyS();
            // console.log("signed up successfully");
            router.push('/pages/login')
        }
        else{
            // console.log("coudlnt sign up right now , try again later")
            notifyE();
        }
        }
    }

  return (
    <div>
      <section className="bg-white h-[80vh] ">
  <div className="flex flex-col items-center justify-start px-6 py-2 my-20  mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Sign Up
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" >
                  <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Your Name</label>
                      <input onChange={handleChange} autoComplete='off'  type="text" name="name" value={name} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="John Wick" required=""/>
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                      <input onChange={handleChange} autoComplete='off' type="email" name="email" value={email} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@abc.com" required=""/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input onChange={handleChange} autoComplete='off' type="password" name="password" value={password} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required=""/>
                  </div>
                  
                  <button type="submit" className="w-full text-white bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{signUpText}</button>
                  <p className="text-sm font-light text-gray-600 ">
                      Already have an account!<Link href="/pages/login" className="font-medium text-gray-800 hover:underline">Sign In</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default Page
