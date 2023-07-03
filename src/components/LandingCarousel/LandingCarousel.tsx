import Image from "next/image";
import React from "react";
import sofaPic from "../../../public/image-40.jpg";
import coffeeTablePic from "../../../public/image 44.jpg";

import {StaticImageData} from "next/image";
import {BiSolidRightArrow, BiSolidLeftArrow} from "react-icons/bi";

import {Swiper, SwiperSlide} from "swiper/react";
import {EffectFade, Navigation, Pagination} from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

type LandingCarouselData = {
  image: StaticImageData;
  title?: string | undefined;
  description?: string | undefined;
  button?: boolean | false;
  align?: "left" | "right";
};

const landingCarouselDatas: LandingCarouselData[] = [
  {
    image: sofaPic,
    title: "Wilson",
    description:
      "Exquisite Italia handmade sofa, a have of comfort and relaxation, meticulously crafter with timeless elegance and artisanal excellence.",
    button: true,
    align: "left",
  },
  {
    image: coffeeTablePic,
    title: "Zenith",
    description:
      "The Zenith coffee table exudes tranquility with its clean, minimalist design and a touch of natural beauty. Crafted from sustainable wood, its smooth surface and sleek lines create a calming presence, offering a perfect balance between style and relaxation in your living room.",
    button: true,
    align: "right",
  },
];

const CarouselItem: React.FC<LandingCarouselData> = (props) => {
  const textAlign = `text-${props.align}`;
  const justifyText = props.align === "right" ? "justify-end" : "";

  return (
    <div className="h-full">
      <Image
        src={props.image}
        alt="sofa pic"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div
        className={`absolute inset-0 flex items-center ${justifyText} ${textAlign}`}
      >
        <div className="w-full sm:w-[50%]">
          <div className="text-white p-20">
            <h2 className="text-4xl mb-4 font-semibold">{props.title}</h2>
            <p className="leading-8">{props.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const LandingCarousel = () => {
  const settings = {
    spaceBetween: 30,
    effect: "fade",
    loop: true,
    centeredSlides: true,
    pagination: {
      clickable: true,
    },
    style: {
      "--swiper-navigation-color": "#ffffff",
      "--swiper-pagination-color": "#ffffff",
      "--swiper-pagination-bottom": "2rem",
      "--swiper-pagination-bullet-inactive-color" : "#ffffff",
      "--swiper-pagination-bullet-inactive-opacity": .6,
      "--swiper-navigation-size": "2rem",
      height: "100%",
    } as React.CSSProperties,

    modules: [EffectFade, Navigation, Pagination],
  };
  return (
    <div className="h-full">
      <Swiper navigation={{
        prevEl: ".image-swiper-button-prev",
        nextEl: ".image-swiper-next-prev",
      }} {...settings} className="mySwiper">
        <button className="absolute inset-y-0 left-0 z-10 flex items-center image-swiper-button-prev hover:bg-black hover:bg-opacity-20 transition-colors">
        <div className="flex justify-center items-center w-10 h-10 text-white opacity-60">
            <BiSolidLeftArrow />
          </div>
        </button>
        {landingCarouselDatas.map((data, index) => {
          return (
            <SwiperSlide className="my-auto py-30" key={index}>
              {({isActive}) => {
                return <CarouselItem {...data} />;
              }}
            </SwiperSlide>
          );
        })}
        <button className="absolute inset-y-0 right-0 z-10 flex items-center image-swiper-button-next hover:bg-black hover:bg-opacity-20 transition-colors">
          <div className="flex justify-center items-center w-10 h-10 text-white opacity-60">
            <BiSolidRightArrow />
          </div>
        </button>
      </Swiper>
    </div>
  );
};

export default LandingCarousel;
