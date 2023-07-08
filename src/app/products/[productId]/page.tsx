"use client";

import "../../globals.css";
import Footer from "@/components/common/footer/Footer";
import Navbar from "@/components/common/navbar/Navbar";
import Container from "@/components/common/Container";
import React, {useState} from "react";
import Image, { StaticImageData } from "next/image";
import Product from "@/types/Product";
import {productData} from "@/dummyProductData";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Header from "@/components/common/header/Header";
import Main from "@/components/common/main/Main";
import ProductImageList from "@/components/page-components/product/product-details/product-image-list/ProductImageList";
import ProductDetailsDescription from "@/components/page-components/product/product-details/product-details-description/ProductDetailsDescription";
import Modal from "@/components/common/modal/Modal";
import Carousel, { CarouselItemProps } from "@/components/common/carousel/Carousel";
import {BiSolidLeftArrow, BiSolidRightArrow} from "react-icons/bi";
import ProductDetailsCarousel from "@/components/page-components/product/product-details/product-details-image-carousel/ProductDetailsCarousel";


const ProductDetails: React.FC<{product: Product}> = (props) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [zoomImage, toggleZoomImage] = useState(false);

  const zoomHandler =
    (index?: number | undefined) => {
      toggleZoomImage((prevState) => !prevState);
      if (index !== undefined) {
        setActiveSlide(index);
      }
    };

    
    props.product = productData[0];
    

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <Modal visible={zoomImage} closeModal={() => {toggleZoomImage((prevState) => !prevState)}}>
        <ProductDetailsCarousel images={props.product.images} initialSlide={activeSlide} key={activeSlide}/>
      </Modal>
      <Header className="sticky top-0 z-30 bg-white">
        <Navbar />
      </Header>

      <Main className="flex-grow">
        <Container className="w-full flex flex-col pt-10">
          <span>{"Product > Chair"}</span>
          <div className="flex flex-col md:flex-row w-full flex-grow gap-x-6 ">
            <ProductImageList {...props.product} zoomImage={(imageIndex) => {zoomHandler(imageIndex)}}/>

            <div className="w-full md:w-1/2 sticky flex-grow top-20 h-full">
              <ProductDetailsDescription {...props.product} />
            </div>
          </div>
        </Container>
      </Main>
      <Footer />
    </div>
  );
};

export default ProductDetails;
