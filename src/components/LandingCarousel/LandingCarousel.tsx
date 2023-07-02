import Image from "next/image";
import React from "react";
import sofaPic from "../../../public/image-40.jpg";
import coffeeTablePic from "../../../public/image 44.jpg";
import "./module.slick-theme.css";
import "./module.slick.css";
import Slider from "react-slick";

import {StaticImageData} from "next/image";
import {BiSolidRightArrow, BiSolidLeftArrow} from "react-icons/bi";

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
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    customPaging: () => (
      <div className="w-3 h-3 border-white border rounded-full cursor-pointer custom-dot"></div>
    ),
  };
  return (
    <div className="h-full">
      <Slider
        className="h-full"
        {...settings}
        nextArrow={
          <button className="p-10">
            <BiSolidRightArrow color="#ffffff" opacity={0.5} />
          </button>
        }
        prevArrow={
          <button>
            <BiSolidLeftArrow color="#ffffff" opacity={0.5} />
          </button>
        }
        arrows={true}
      >
        {landingCarouselDatas.map((data, index) => {
          return <CarouselItem key={index} {...data} />;
        })}
      </Slider>
    </div>
  );
};

export default LandingCarousel;
