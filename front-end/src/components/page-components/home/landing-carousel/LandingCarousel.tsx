"use client"

import Carousel from "@/components/shared/carousel/Carousel";
import LandingCarouselItem from "./LandingCarouselItem";
import {BiSolidRightArrow, BiSolidLeftArrow} from "react-icons/bi";
import landingCarouselDatas from "@/utils/dummy-data/landingCarouselData";



const LandingCarouselLeftButton = () => {
  return (
    <button className="absolute inset-y-0 left-0 z-20 flex items-center image-swiper-button-prev hover:bg-black hover:bg-opacity-20 transition-colors">
      <div className="flex justify-center items-center w-10 h-10 text-white opacity-60">
        <BiSolidLeftArrow />
      </div>
    </button>
  );
};

const LandingCarouselRightButton = () => {
  return (
    <button className="absolute inset-y-0 right-0 z-20 flex items-center image-swiper-button-next hover:bg-black hover:bg-opacity-20 transition-colors">
      <div className="flex justify-center items-center w-10 h-10 text-white opacity-60">
        <BiSolidRightArrow />
      </div>
    </button>
  );
};

const LandingCarousel = () => {
  return (
    <div className="relative flex-grow h-full">
      <Carousel
        leftButton={<LandingCarouselLeftButton />}
        rightButton={<LandingCarouselRightButton />}
        datas={landingCarouselDatas}
        CarouselItem={LandingCarouselItem}
      />
    </div>
  );
};

export default LandingCarousel;
