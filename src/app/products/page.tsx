import Navbar from "@/components/Navbar/Navbar";
import "../globals.css";
import React from "react";
import Container from "@/components/Container";
import Product from "@/types/Product";
import Footer from "@/components/Footer";
import { productData } from "@/dummyProductData";
import Image from "next/image";


const categoryItemData = [
  {
    name: "ALL",
  },
  {
    name: "BEDROOM",
  },
  {
    name: "LIVING ROOM",
  },
  {
    name: "OFFICE",
  },
  {
    name: "DINING",
  },
  {
    name: "OUTDOOR",
  },
];

const products: Product[] = productData;

const ProductCard: React.FC<Product> = (props) => {
  return (
    <div className="flex flex-col h-min group cursor-pointer">
      <div className="relative w-full h-[300px]">
        <Image
          className="absolute h-full object-cover"
          src="/image-40.jpg"
          alt={props.title}
          fill={true}
        />
        <Image
          className="z-10 relative h-full object-cover group-hover:opacity-0 transition-opacity duration-500"
          src={props.image[0]}
          alt={props.title}
          fill={true}
        />
      </div>
      <h4 className="mt-2 text-2xl font-semibold group-hover:underline">{props.title}</h4>
    </div>
  );
};

const Products = () => {
  const activeIndex = 1;

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navbar />
      <Container className="flex flex-col flex-grow h-full w-full">
        <h1 className="text-4xl font-semibold">PRODUCTS</h1>
        <div className="w-full h-[1px] bg-black mt-4 mb-8"></div>

        <div className="flex flex-row flex-grow w-full h-full">
          <div className="w-1/3 mr-20">
            <ul>
              {categoryItemData.map((item, index) => {
                return (
                  <li
                    className={`text-xl mt-5 cursor-pointer ${
                      index === activeIndex ? "font-bold" : "font-normal"
                    }`}
                    key={item.name}
                  >
                    {item.name}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 w-full">
            {products.map((product, index) => {
              return <ProductCard key={index} {...product} />;
            })}
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Products;
