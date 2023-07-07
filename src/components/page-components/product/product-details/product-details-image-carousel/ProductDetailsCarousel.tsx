import ProductDetailsCarouselItem from "./ProductDetailsItem";
import { StaticImageData } from "next/image";
import { ModalCarouselLeftButton, ModalCarouselRightButton } from "./ProductDetailsCarouselButtons";
import Carousel from "@/components/common/carousel/Carousel";


type ProductDetailsCarouselProps = {
  images: (string | StaticImageData)[];
  initialSlide: number;
  key?: React.Key;
}

const ProductDetailsCarousel:  React.FC<ProductDetailsCarouselProps>= ({images, initialSlide, key = 0}) => {
  return (
    <Carousel
      leftButton={<ModalCarouselLeftButton />}
      rightButton={<ModalCarouselRightButton />}
      datas={images}
      CarouselItem={ProductDetailsCarouselItem}
      paginationColour="rgb(75 85 99)"
      paginationBulletInactiveColor="rgb(75 85 99)"
      paginationBottomPadding="2rem"
      initialSlide={initialSlide}
      key={key}
    />
  );
};

export default ProductDetailsCarousel;
