import React, {useState} from "react";
import "../globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Product from "@/types/Product";
import Image from "next/image";

interface shoppingCartItem extends Product {
  quantity: number;
}

const Cart: React.FC<{shoppingCart: shoppingCartItem[]}> = (props) => {
  const products: shoppingCartItem[] = [
    {
      title: "Product 1",
      price: 100,
      quantity: 2,
      description: "",
      image: ["/image-40.jpg"],
    },
    {
      title: "Cossette",
      price: 50,
      quantity: 1,
      description: "",
      image: ["/image 44.jpg"],
    },
    {
      title: "Aria",
      price: 150,
      quantity: 3,
      description: "",
      image: ["/image 37.jpg"],
    },
    {
      title: "Product 3",
      price: 150,
      quantity: 3,
      description: "",
      image: ["/image 43.jpg"],
    },
    {
      title: "Product 3",
      price: 150,
      quantity: 3,
      description: "",
      image: ["/image 43.jpg"],
    },
    {
      title: "Product 3",
      price: 150,
      quantity: 3,
      description: "",
      image: ["/image 43.jpg"],
    },
  ];

  const totalCost = (products: shoppingCartItem[]) => {
    let sum = 0;
    for (let i = 0; i < products.length; i++) {
      sum += products[i].price * products[i].quantity;
    }
    return sum;
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <div className="sticky top-0 z-10 bg-white">
        <Navbar />
      </div>
      <Container className="w-full flex flex-col flex-1 bg-white">
        <div className="flex flex-col lg:flex-row w-full flex-grow gap-x-20 bg-white">
          <div className="w-full">
            <div className="w-full sticky z-20 top-0 pt-[6rem] bg-white pb-5">
              <span className="text-4xl font-semibold bg-white w-full">
                Cart
              </span>
              <div className="grid grid-cols-4 text-center font-semibold pl-5 bg-white pt-20 pb-5 border-b border-gray-200">
                <div className="w-full text-left col-span-2">Product</div>
                <div>Price</div>
                <div>Quantity</div>
              </div>
            </div>
            {products.map((product, index) => (
              <div
                className={`grid grid-cols-4 text-center ${
                  index < products.length - 1 && "border-b border-gray-200"
                }`}
                key={index}
              >
                <div className="flex items-center justify-center my-5 col-span-2">
                  <div className="min-w-[100px] md:w-[200px] bg-red-50 relative aspect-square">
                  <Image
                      src={product.image[0]}
                      alt="image"
                      className="object-cover absolute inset-0"
                      fill
                      sizes="100vw"
                    />
                  </div>

                  <div className="flex-1 ml-5 md:ml-10 text-left flex flex-col">
                    <span className="flex-1 text-left">{product.title}</span>
                    <span className="text-sm text-gray-400">{"Table"}</span>
                  </div>
                  
                </div>
                <div className="text-right flex items-center justify-end mr-5">
                  $ {product.price}
                </div>
                <div className="flex items-center justify-center ">
                  <div className="w-[100px] grid grid-cols-3">
                    <button className="border border-r-0 border-black">
                      -
                    </button>
                    <span className="border border-black">
                      {product.quantity}
                    </span>
                    <button className="border border-l-0 border-black">
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full md:w-1/2 sticky flex-grow top-0 pt-20 h-full">
            <div className="flex flex-col p-5 mt-10 pt-10 md:pt-20 border border-gray-200">
              <h2 className="text-3xl font-semibold">TOTAL</h2>
              <div className="border-b border-gray-200 pb-5 mt-5">
                {products.map((product) => {
                  return (
                    <div className="grid grid-cols-3">
                      <div className="flex gap-x-2 col-span-2">
                        <span className="font-medium">{product.title}</span>
                        <span>x {product.quantity}</span>
                      </div>
                      <div className="text-left font-medium">
                        $ {product.price * product.quantity}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pb-4 border-b border-gray-200">
                <div className="grid grid-cols-3">
                  <div className="col-span-2">Subtotal</div>
                  <div className="col-span-1 font-medium">
                    $ {totalCost(products)}
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="col-span-2">Discount</div>
                  <div className="col-span-1 font-medium">-10%</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="grid grid-cols-3">
                  <div className="col-span-2">TOTAL</div>
                  <div className="col-span-1 font-medium">
                    $ {totalCost(products) * 0.9}
                  </div>
                </div>
              </div>

              <div className="mt-10 w-full">
                <Button className="w-full" filled>Proceed to Checkout</Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Cart;
