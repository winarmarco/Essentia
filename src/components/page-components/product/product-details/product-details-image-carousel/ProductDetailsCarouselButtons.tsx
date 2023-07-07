import {BiSolidRightArrow, BiSolidLeftArrow} from "react-icons/bi";

const ModalCarouselLeftButton: React.FC = () => {
  return (
    <button className="absolute inset-y-0 left-0 z-20 flex items-center image-swiper-button-prev transition-colors">
      <div className="flex justify-center items-center w-10 h-10 text-black opacity-60">
        <BiSolidLeftArrow />
      </div>
    </button>
  );
};

const ModalCarouselRightButton: React.FC = () => {
  return (
    <button className="absolute inset-y-0 right-0 z-20 flex items-center image-swiper-button-next transition-colors">
      <div className="flex justify-center items-center w-10 h-10 text-black opacity-60">
        <BiSolidRightArrow />
      </div>
    </button>
  );
};


export {ModalCarouselLeftButton, ModalCarouselRightButton};