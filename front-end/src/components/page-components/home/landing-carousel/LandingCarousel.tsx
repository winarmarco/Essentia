"use client"

import Carousel from "@/components/shared/carousel/Carousel";
import LandingCarouselItem, { LandingCarouselItemType } from "./LandingCarouselItem";
import {BiSolidRightArrow, BiSolidLeftArrow} from "react-icons/bi";
// import landingCarouselDatas from "@/utils2/dummy-data/landingCarouselData";
import { IProduct } from "@/utils/types/products";



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

const LandingCarousel: React.FC<{products: IProduct[]}> = ({products}) => {

  const alignedProducts = products.map((product, index) => {
    return {...product, alignment: (index % 2 == 0) ? "left" : "right"}
  })


  return (
    <div className="relative flex-grow h-full">
      <Carousel
        leftButton={<LandingCarouselLeftButton />}
        rightButton={<LandingCarouselRightButton />}
        datas={alignedProducts}
        CarouselItem={LandingCarouselItem}
      />
    </div>
  );
};

export default LandingCarousel;
