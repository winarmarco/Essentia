import { CarouselItemProps } from "@/components/common/carousel/Carousel";
import { IProduct } from "@/utils/types";
import Image from "next/image";

export interface LandingCarouselItemType extends IProduct {
  alignment: "left" | "right";
}

const LandingCarouselItem: React.FC<CarouselItemProps<LandingCarouselItemType>> = ({ data }) => {
  const { alignment, name, images, shortDescription } = data;

  const textAlign = `text-${alignment}`;
  const justifyText = alignment === "right" ? "justify-end" : "";

  return (
    <div className="h-full relative">
      <Image
        src={images[0]}
        alt="sofa pic"
        className="absolute inset-0 w-full h-full object-cover"
        fill
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div
        className={`absolute inset-0 flex items-center ${justifyText} ${textAlign}`}
      >
        <div className="w-full sm:w-[50%]">
          <div className="text-white p-20">
            <h2 className="text-4xl mb-4 font-semibold">{name}</h2>
            <p className="leading-8">{shortDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingCarouselItem;
