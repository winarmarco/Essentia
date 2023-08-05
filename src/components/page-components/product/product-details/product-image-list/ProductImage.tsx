import React from "react";
import {BsZoomIn} from "react-icons/bs";
import Image from "next/image";

const ProductImage: React.FC<{imageUrl: string, className?: string, zoomHandler: () => void}> = ({imageUrl, className = "", zoomHandler}) => {
  return (
    <div className={`w-full mt-10 relative group cursor-pointer ${className}}`} onClick={zoomHandler}>
      <div
        className="absolute inset-0 bg-black z-10 bg-opacity-40 flex items-center 
                    justify-center invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity"
      >
        <BsZoomIn className="text-white text-3xl" />
      </div>
      <Image
        src={imageUrl}
        alt="image"
        className="h-full w-full"
        width={0}
        height={0}
        sizes="100vw"
      />
    </div>
  );
};


export default ProductImage;