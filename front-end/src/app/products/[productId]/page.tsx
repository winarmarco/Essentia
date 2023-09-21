"use client";

import "../../globals.css";
import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import Container from "@/components/shared/Container";
import React, {useEffect, useState} from "react";

import Header from "@/components/shared/header/Header";
import Main from "@/components/shared/main/Main";
import ProductImageList from "@/components/page-components/product/product-details/product-image-list/ProductImageList";
import ProductDetailsDescription from "@/components/page-components/product/product-details/product-details-description/ProductDetailsDescription";
import Modal from "@/components/shared/modal/Modal";
import ProductDetailsCarousel from "@/components/page-components/product/product-details/product-details-image-carousel/ProductDetailsCarousel";
import {redirect, useParams} from "next/navigation";
import { IProduct } from "@/utils/types";

const getProductDetails = async (productId: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${productId}`, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    const resData = await res.json();

    console.log(resData);

    return resData;
  } catch (error) {
    return error;
  }
};

const ProductDetails = () => {
  const searchParams = useParams();
  const productId = searchParams["productId"];
  const [productDetails, setProductDetails] = useState<IProduct>();
  const [activeSlide, setActiveSlide] = useState(0);
  const [zoomImage, toggleZoomImage] = useState(false);

  const zoomHandler = (index?: number | undefined) => {
    toggleZoomImage((prevState) => !prevState);
    if (index !== undefined) {
      setActiveSlide(index);
    }
  };

  useEffect(() => {
    const fetchData = async () => {

      if (!productId) return redirect("/products");
      const productDetailsData = await getProductDetails(productId);
      
      setProductDetails(productDetailsData)
    }

    fetchData();
  }, [productId]);
  console.log(productDetails);
  

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <Modal
        visible={zoomImage}
        closeModal={() => {
          toggleZoomImage((prevState) => !prevState);
        }}
      >
        {productDetails && (
          <ProductDetailsCarousel
            images={productDetails.images}
            initialSlide={activeSlide}
            key={activeSlide}
          />
        )}
      </Modal>
      <Header className="sticky top-0 z-30 bg-white">
        <Navbar />
      </Header>

      <Main className="flex-grow">
        <Container className="w-full flex flex-col pt-10">
          <span>{"< Back"}</span>
          {productDetails && (
            <div className="flex flex-col md:flex-row w-full flex-grow gap-x-6 ">
              <ProductImageList
                images={productDetails.images}
                zoomImage={(imageIndex) => {
                  zoomHandler(imageIndex);
                }}
              />

              <div className="w-full md:w-1/2 sticky flex-grow top-20 h-full">
                <ProductDetailsDescription {...productDetails} />
              </div>
            </div>
          )}
        </Container>
      </Main>
      <Footer />
    </div>
  );
};

export default ProductDetails;
