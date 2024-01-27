
import React from "react";
import Link from "next/link";
import Product from "../../../../models/Product";
import mongoose from "mongoose";

let getProducts = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  let products = await Product.find({ category: "hoodies" });
  // console.log(products)
  
  return products;
};

async function Page() {
  let products = await getProducts();

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container-fluid px-5 py-24 lg:ml-20">
          <div className="flex flex-wrap -m-3 lg:ml-20 mx-auto">
            {products.map((product) => {
              const colorsArray = product.color.split(',');
              return (
                <Link
                  href={`/pages/product/${product.category}-${product.slug}`}
                  className="md:w-1/5 w-full space-x-2 mx-3 my-3"
                  key={product._id}
                >
                  <div className="lg:w-full md:w-full p-4 w-full cursor-pointer shadow-lg mx-auto">
                    <img
                      alt="ecommerce"
                      className="h-[36vh] w-[50vh] mx-auto lg:mx-0 block"
                      style={{ objectFit: "contain" }}
                      src={product.image}
                    />

                    <div>
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        {product.category}
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {product.title}
                      </h2>
                      <p className="mt-1">₹{product.price}</p>
                      <p className="mt-1">
                        <b>Size:</b> {product.size}
                      </p>
                      
                        {colorsArray.includes("black") && <button className={`border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-4 h-4 focus:outline-none`}
                      ></button>}
                        {colorsArray.includes("red") && <button className={`border-2 border-red-300 ml-1 bg-red-700 rounded-full w-4 h-4 focus:outline-none`}
                      ></button>}
                        {colorsArray.includes("blue") && <button className={`border-2 border-blue-300 ml-1 bg-blue-700 rounded-full w-4 h-4 focus:outline-none`}
                      ></button>}
                        {colorsArray.includes("white") && <button className={`border-2 border-gray-300 ml-1 bg-white-700 rounded-full w-4 h-4 focus:outline-none`}
                      ></button>}
                      
                    
                      {product.availableQty > 20 ? (
                        <p className="text-xs text-green-500">In stock right now.</p>
                      ) : (
                        <p className="text-xs text-red-500">Few left, hurry up!</p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Page;








// let getproducts = async () => {
//   let products = await fetch("http://localhost:3000/api/getProduct",{cache:"no-store"}, {
//     method: "GET",
//   });
//   products = await products.json();
//   // console.log(products);
//   if (products.success) {
//     return products.result;
//   } else {
//     throw new Error("Could not load data");
//   }
// };