import LandingCarouselType from "@/types/LandingCarousel";
import Image from "next/image";

const LandingCarouselItem: React.FC<LandingCarouselType> = (props) => {
  const textAlign = `text-${props.align}`;
  const justifyText = props.align === "right" ? "justify-end" : "";

  return (
    <div className="h-full">
      <Image
        src={props.image}
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
            <h2 className="text-4xl mb-4 font-semibold">{props.title}</h2>
            <p className="leading-8">{props.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingCarouselItem;
