"use client";

import Navbar from "@/components/common/navbar/Navbar";
import "../globals.css";
import React, {useEffect, useState} from "react";
import Container from "@/components/common/Container";
import Footer from "@/components/common/footer/Footer";
import categoryFilters from "@/utils/constants/categoryFilter";
import ProductCard from "@/components/page-components/product/product-card/ProductCard";
import ProductCateogoryFilter from "@/components/page-components/product/product-category-filter/ProductCategoryFilter";
import Header from "@/components/common/header/Header";
import Main from "@/components/common/main/Main";
import IProduct from "@/utils/types/Product";


export const fetchProductData = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/products", {
      cache: "no-store",
    });
    const data = await response.json();

    return data;
  } catch (error) {}
};

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>();
  const [selectedFilter, setSelectedFilter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedProducts: IProduct[] = await fetchProductData();
      setProducts(fetchedProducts);
    }

    fetchData();
  }, []);


  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <Header className="sticky top-0 z-30 bg-white">
        <Navbar />
        <Container className="flex flex-col flex-grow h-full w-full mt-4">
          <h1 className="text-4xl font-semibold">PRODUCTS</h1>
          <div className="w-full h-[1px] bg-black mt-4 mb-8"></div>
        </Container>
      </Header>

      <Main className="flex-grow">
        <Container className="flex-grow h-full w-full">
          <div className="flex flex-row flex-grow w-full h-full">
            <div className="w-1/3 mr-20 sticky top-[12rem] h-full">
              <ProductCateogoryFilter
                categoryFilters={categoryFilters}
                selectedFilter={selectedFilter}
                onSelect={(filter) => {
                  setSelectedFilter(filter);
                }}
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 w-full">
              {products && products.map((product) => {
                return (
                  <ProductCard
                    key={product._id}
                    {...product}
                  />
                );
              })}
            </div>
          </div>
        </Container>
      </Main>
      <Footer />
    </div>
  );
};

export default Products;
