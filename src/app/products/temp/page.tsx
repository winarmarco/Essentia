"use client";

import "../../globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Container from "@/components/Container";
import React, {CSSProperties} from "react";
import Image from "next/image";
import Product from "@/types/Product";
import {productData} from "@/dummyProductData";
import Button from "@/components/Button";
import {BsZoomIn} from "react-icons/bs";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../../components/LandingCarousel/module.slick-theme.css";
import "../../../components/LandingCarousel/module.slick.css";

import {Swiper, SwiperSlide} from "swiper/react";
import {EffectFade, Navigation, Pagination} from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Slider from "react-slick";
import {BiSolidRightArrow, BiSolidLeftArrow} from "react-icons/bi";

const arrowStyles: CSSProperties = {
  position: "absolute",
  zIndex: 2,
  top: "calc(50% - 15px)",
  width: 30,
  height: 30,
  cursor: "pointer",
};

const ProductDetails: React.FC<{product: Product}> = (props) => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    customPaging: () => (
      <div className="w-3 h-3 border-gray-700 border rounded-full cursor-pointer"></div>
    ),
  };
  props.product = productData[0];

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <div className="fixed inset-0 flex items-center justify-center z-50 h-screen">
        <div
          className="absolute inset-0 bg-white opacity-50  flex items-center 
                      justify-center transition-opacity"
        ></div>
        <div className="relative z-20 h-full w-[70%]">
          <Swiper
            spaceBetween={30}
            effect={"fade"}
            loop={true}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            slideClass="swiper-slide invisible"
            
            modules={[EffectFade, Navigation, Pagination]}
            className="mySwiper"
          >
            {props.product.image.map((image, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="px-20 flex items-center justify-center h-full">
                    <Image
                      src={image}
                      alt="image"
                      className="object-contain w-full h-full my-auto"
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div className="sticky top-0 z-10 bg-white">
        <Navbar />
      </div>
      <Container className="flex flex-row w-full flex-grow gap-x-6 pt-20">
        <div className="w-1/2 flex flex-col space-y-10">
          {props.product.image.map((image, index) => (
            <div
              key={index}
              className="w-full mt-10 relative group cursor-pointer"
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
        <div className="w-1/2 sticky flex-grow top-0 pt-20 h-full">
          <div className="flex flex-col  px-5 pt-20">
            <h2 className="text-3xl font-semibold">{props.product.title}</h2>
            <p className="leading-loose pt-2 whitespace-pre-line">
              {props.product.description.trim()}
            </p>
            <span className="mt-10">Price : {`$ ${props.product.price}`}</span>
            <Button className="mt-20">Add to cart + </Button>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default ProductDetails;

{
  /* <Slider
          className="h-full"
            {...settings}
            nextArrow={
              <button className="p-10">
                <BiSolidRightArrow color="black" opacity={0.5} />
              </button>
            }
            prevArrow={
              <button>
                <BiSolidLeftArrow color="#black" opacity={0.5} />
              </button>
            }
            arrows={true}
          >
            {props.product.image.map((image, index) => {
              return (
                <div
                  key={index}
                  className="px-20 flex items-center justify-center h-full"
                >
                  <Image
                    src={image}
                    alt="image"
                    className="object-contain w-full h-full my-auto"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </div>
              );
            })}
          </Slider> */
}
