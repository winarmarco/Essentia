"use client"

import {Swiper, SwiperProps, SwiperSlide} from "swiper/react";
import {EffectFade, Navigation, Pagination} from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

type CarouselProps<T> = {
  leftButton: React.ReactNode;
  rightButton: React.ReactNode;
  CarouselItem: React.FC<T>;
  datas: T[];
};

const Carousel = <T extends object>({
  leftButton,
  rightButton,
  datas,
  CarouselItem,
}: CarouselProps<T>) => {

  const settings: SwiperProps = {
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
      "--swiper-pagination-bullet-inactive-color": "#ffffff",
      "--swiper-pagination-bullet-inactive-opacity": 0.6,
      "--swiper-navigation-size": "2rem",
      height: "100%",
    } as React.CSSProperties,
    navigation: {
      prevEl: ".image-swiper-button-prev",
      nextEl: ".image-swiper-button-next",
    },
    modules: [EffectFade, Navigation, Pagination],
  };

  return (
    <Swiper {...settings}>
      {leftButton}
      {datas.map((data, index) => (
        <SwiperSlide className="my-auto py-30" key={index}>
          {({isActive}) => <CarouselItem {...data} isActive={isActive} />}
        </SwiperSlide>
      ))}
      {rightButton}
    </Swiper>
  );
};


export default Carousel;