'use client'
import React, { useContext, useState } from 'react'
import Logo from '../../../../public/assets/logo.png'
import Image from 'next/image';
import Link from 'next/link';
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { CartContext } from '@/app/layout';

function Page() {

    const notifyS = () => toast.success("Signed In successfully.", {
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

    const notifyE = () => toast.error('Enter valid details!', {
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

    const notifyN = () => toast.error('No user found,try signing up', {
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

    const notifyC = () => toast.error('Cant log in ', {
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
    const notifyW = () => toast.error("Wrong credentials entered", {
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

    const [email,setEmail] = useState();
    const [password,setPassword] = useState()
    const [signInText,setSignInText] = useState("Sign In")

    const handleChange=(e)=>{
        if(e.target.name=="email"){
            setEmail(e.target.value)
        }
        else if(e.target.name=="password"){
            setPassword(e.target.value)
        }
    }

    let router = useRouter();
    const {auth,setAuth} = useContext(CartContext)

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            if(!email || !password){
                console.log("not valid")
                notifyE();
            }
            else{
                let result = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`,{
                    method:"POST",
                    headers:{
                        'Content-type':'application-json'
                    },
                    body:JSON.stringify({email,password})
                })
                result = await result.json();
                // console.log(result);
                if(result.success){
                    setSignInText('Signing In')
                    let authToken=result.authToken;
                    // console.log(authToken)
                    localStorage.setItem("authToken",authToken)
                    localStorage.setItem("userEmail",email)
                    // console.log("logged in")
                    setAuth(true)
                    notifyS();
                    router.push("/")
                }
                else if(result.result==="No user found"){
                    notifyN();
                }
                else if(result.result==="Wrong credentials entered"){
                    notifyW();
                }
                else{
                    // console.log("cant log in")
                    notifyC();
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
      <section className="bg-white h-[80vh] ">
  <div className="flex flex-col items-center justify-start px-6 py-2 my-20  mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Sign in to your account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                      <input type="email" name="email" value={email} onChange={handleChange} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@abc.com" required=""/>
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input type="password" name="password" value={password} onChange={handleChange} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required=""/>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label for="remember" className="text-gray-500">Remember me</label>
                          </div>
                      </div>
                      <Link href="/pages/forgot" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                  </div>
                  <button type="submit" className="w-full text-white bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{signInText}</button>
                  <p className="text-sm font-light text-gray-600 ">
                      Don’t have an account yet? <Link href="/pages/signup" className="font-medium text-gray-800 hover:underline">Sign Up</Link>
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
