import Image, { StaticImageData } from "next/image";
import { CarouselItemProps } from "@/components/common/carousel/Carousel";


const ProductDetailsCarouselItem: React.FC<CarouselItemProps<string | StaticImageData>> = ({data, isActive}) => {

  return (
    <div
      className={`px-10 md:px-20 items-center justify-center h-full ${
        !isActive ? "hidden" : "flex"
      }`}
    >
      <Image
        src={data}
        alt="image"
        className="object-contain w-full h-full lg:max-h-[100vh] py-20"
        width={0}
        height={0}
        sizes="100vw"
      />
    </div>
  );
};

export default ProductDetailsCarouselItem;