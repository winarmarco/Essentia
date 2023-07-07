"use client";

import "../../globals.css";
import Footer from "@/components/common/footer/Footer";
import Navbar from "@/components/common/navbar/Navbar";
import Container from "@/components/common/Container";
import React, {useRef, useState} from "react";
import Image from "next/image";
import Product from "@/types/Product";
import {productData} from "@/dummyProductData";
import Button from "@/components/common/Button";
import {BsZoomIn} from "react-icons/bs";
import {LiaTimesSolid} from "react-icons/lia";

import {Swiper, SwiperClass, SwiperSlide} from "swiper/react";
import {EffectFade, Navigation, Pagination} from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductDetails: React.FC<{product: Product}> = (props) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [zoomImage, toggleZoomImage] = useState(false);

  const zoomHandler =
    (index?: number | undefined) =>
    (event: React.MouseEvent<HTMLDivElement>) => {
      console.log(index);
      toggleZoomImage((prevState) => !prevState);
      if (index !== undefined) {
        setActiveSlide(index);
      }
    };

  props.product = productData[0];

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <div
        className={`fixed inset-0 items-center justify-center z-50 h-screen transition-all 
              duration-500 flex ${
                zoomImage
                  ? "opacity-100 visible"
                  : "opacity-0 invisible pointer-events-none"
              }`}
      >
        <div
          className="absolute inset-0 bg-white opacity-90 bg-gray flex items-center 
                      justify-center transition-opacity"
        ></div>
        <div
          className="absolute top-20 z-30 right-10 cursor-pointer"
          onClick={zoomHandler()}
        >
          <LiaTimesSolid className="text-3xl" />
        </div>
        <div
          className={`relative z-20 h-full pb-10 w-full md:w-[70%] ${
            zoomImage ? "opacity-100 visible" : "opacity-0 invisible hidden"
          }`}
        >
          <Swiper
            spaceBetween={30}
            effect={"fade"}
            loop={true}
            navigation={true}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            initialSlide={activeSlide}
            style={
              {
                "--swiper-navigation-color": "rgb(75 85 99)",
                "--swiper-pagination-color": "rgb(75 85 99)",
                "--swiper-pagination-bottom": "2rem",
                "--swiper-navigation-size": "2rem",
                height: "100%",
              } as React.CSSProperties
            }
            modules={[EffectFade, Navigation, Pagination]}
            key={activeSlide}
            className="mySwiper"
          >
            {props.product.image.map((image, index) => {
              return (
                <SwiperSlide className="my-auto py-30" key={index}>
                  {({isActive}) => {
                    return (
                      <div
                        className={`px-10 md:px-20 items-center justify-center h-full ${
                          !isActive ? "hidden" : "flex"
                        }`}
                      >
                        <Image
                          src={image}
                          alt="image"
                          className="object-contain w-full h-full lg:max-h-[100vh] py-20"
                          width={0}
                          height={0}
                          sizes="100vw"
                        />
                      </div>
                    );
                  }}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div className="sticky top-0 z-10 bg-white">
        <Navbar />
      </div>
      <Container className="w-full flex flex-col pt-10">
        <span>{"Product > Chair"}</span>
        <div className="flex flex-col md:flex-row w-full flex-grow gap-x-6 ">
          <div className="w-full md:w-1/2 flex flex-col space-y-10">
            {props.product.image.map((image, index) => (
              <div
                key={index}
                className={`w-full mt-10 relative group cursor-pointer ${
                  index > 0 ? "hidden md:flex" : "flex"
                }`}
                onClick={zoomHandler(index)}
              >
                <div
                  className="absolute inset-0 bg-black z-10 bg-opacity-40 flex items-center 
                              justify-center invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity"
                >
                  <BsZoomIn className="text-white text-3xl" />
                </div>
                <Image
                  src={image}
                  alt="image"
                  className="h-full w-full"
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
          <div className="w-full md:w-1/2 sticky flex-grow top-0 pt-20 h-full">
            <div className="flex flex-col  px-5 mt-10 md:pt-20">
              <h2 className="text-3xl font-semibold">{props.product.title}</h2>
              <p className="leading-loose pt-2 whitespace-pre-line">
                {props.product.description.trim()}
              </p>
              <span className="mt-10">
                Price : {`$ ${props.product.price}`}
              </span>
              <Button className="mt-20">Add to cart + </Button>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default ProductDetails;
