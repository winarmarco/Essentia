"use client";

import {Swiper, SwiperProps, SwiperSlide} from "swiper/react";
import {EffectFade, Navigation, Pagination} from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CarouselItemProps<T> {
  data: T;
  isActive: boolean;
}

type CarouselProps<T> = {
  leftButton: React.ReactNode;
  rightButton: React.ReactNode;
  CarouselItem: React.FC<CarouselItemProps<T>>;
  datas: T[];
  initialSlide?: number;
  navigationColour?: string | undefined;
  paginationColour?: string | undefined;
  paginationBottomPadding?: string | undefined;
  paginationBulletInactiveColor?: string | undefined;
  paginationInactiveOpacity?: number | undefined;
};

const Carousel = <T extends any>({
  leftButton,
  rightButton,
  datas,
  CarouselItem,
  initialSlide = 0,
  navigationColour = "#ffffff",
  paginationColour = "#ffffff",
  paginationBottomPadding = "2rem",
  paginationBulletInactiveColor = "#ffffff",
  paginationInactiveOpacity = 0.6,
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
      "--swiper-navigation-color": navigationColour,
      "--swiper-pagination-color": paginationColour,
      "--swiper-pagination-bottom": paginationBottomPadding,
      "--swiper-pagination-bullet-inactive-color": paginationBulletInactiveColor,
      "--swiper-pagination-bullet-inactive-opacity": paginationInactiveOpacity,
      "--swiper-navigation-size": "2rem",
      height: "100%",
    } as React.CSSProperties,
    navigation: {
      prevEl: ".image-swiper-button-prev",
      nextEl: ".image-swiper-button-next",
    },
    initialSlide: initialSlide,
    modules: [EffectFade, Navigation, Pagination],
  };



  return (
    <Swiper {...settings}>
      {leftButton}
      {datas.map((data, index) => (
        <SwiperSlide className="my-auto py-30" key={index}>
          {/* if datas length is only one, it must be active */}
          {({isActive}) => <CarouselItem data={data} isActive={(datas.length === 1) ? true : isActive} />}
        </SwiperSlide>
      ))}
      {rightButton}
    </Swiper>
  );
};

export default Carousel;
export type {CarouselItemProps};
