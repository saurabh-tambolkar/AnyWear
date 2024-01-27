import React from 'react'
import Logo from '../../../../public/assets/logo.png'
import Image from 'next/image';
import Link from 'next/link';

function page() {
  return (
    <div>
      <section className="bg-white h-[50vh] ">
  <div className="flex flex-col items-center justify-start px-6 py-2 my-20  mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Forgot Password
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@abc.com" required=""/>
                  </div>
                  
                  
                  <button type="submit" className="w-full text-white bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update password</button>
                  <p className="text-sm font-light text-gray-600 ">
                      Got the password! <Link href="/pages/signin" className="font-medium text-gray-800 hover:underline">Sign In</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default page
