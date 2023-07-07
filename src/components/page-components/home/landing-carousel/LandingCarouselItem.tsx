import { CarouselItemProps } from "@/components/common/carousel/Carousel";
import LandingCarouselType from "@/types/LandingCarousel";
import Image from "next/image";

const LandingCarouselItem: React.FC<CarouselItemProps<LandingCarouselType>> = ({data}) => {
  const textAlign = `text-${data.align}`;
  const justifyText = data.align === "right" ? "justify-end" : "";

  return (
    <div className="h-full">
      <Image
        src={data.image}
        alt="sofa pic"
        className="absolute inset-0 w-full h-full object-cover"
        fill
      />
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div
        className={`absolute inset-0 flex items-center ${justifyText} ${textAlign}`}
      >
        <div className="w-full sm:w-[50%]">
          <div className="text-white p-20">
            <h2 className="text-4xl mb-4 font-semibold">{data.title}</h2>
            <p className="leading-8">{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingCarouselItem;
