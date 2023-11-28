import ProductDetailsCarouselItem from "./ProductDetailsItem";
import { ModalCarouselLeftButton, ModalCarouselRightButton } from "./ProductDetailsCarouselButtons";
import Carousel from "@/components/shared/carousel/Carousel";
import { IProduct } from "@/utils/types/products";


type ProductDetailsCarouselProps = {
  images: IProduct["images"];
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
