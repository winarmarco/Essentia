"use client";

import Navbar from "@/components/common/navbar/Navbar";
import "../globals.css";
import React, {useState} from "react";
import Container from "@/components/common/Container";
import Product from "@/types/Product";
import Footer from "@/components/common/footer/Footer";
import {productData} from "@/dummyProductData";
import categoryFilters from "@/utils/constants/categoryFilter";
import ProductCard from "@/components/page-components/product/product-card/ProductCard";
import ProductCateogoryFilter from "@/components/page-components/product/product-category-filter/ProductCategoryFilter";
import Header from "@/components/common/header/Header";
import Main from "@/components/common/main/Main";

const Products = () => {
  const [selectedFilter, setSelectedFilter] = useState(0);

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <Header className="sticky top-0 z-30 bg-white">
        <Navbar />
        <Container className="flex flex-col flex-grow h-full w-full mt-4">
          <h1 className="text-4xl font-semibold">PRODUCTS</h1>
          <div className="w-full h-[1px] bg-black mt-4 mb-8"></div>
        </Container>
      </Header>

      <Main>
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
              {productData.map((product, index) => {
                return <ProductCard key={index} {...product} />;
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
