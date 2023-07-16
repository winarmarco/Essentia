import ProductDetailsCarouselItem from "./ProductDetailsItem";
import { StaticImageData } from "next/image";
import { ModalCarouselLeftButton, ModalCarouselRightButton } from "./ProductDetailsCarouselButtons";
import Carousel from "@/components/common/carousel/Carousel";
import Product from "@/utils/types/Product";


type ProductDetailsCarouselProps = {
  images: string[];
  initialSlide: number;
}

const ProductDetailsCarousel:  React.FC<ProductDetailsCarouselProps>= ({images, initialSlide}) => {
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
    />
  );
};

export default ProductDetailsCarousel;
