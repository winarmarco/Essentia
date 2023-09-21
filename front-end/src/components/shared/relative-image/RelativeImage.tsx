import Image, {StaticImageData} from "next/image";
import React, {HTMLAttributes} from "react";

interface RelativeImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string | StaticImageData;
  alt: string;
};

const RelativeImage: React.FC<RelativeImageProps> = ({
  src,
  alt,
  ...divProps
}) => {
  return (
    <div className={`relative ${divProps.className ? divProps.className : ""}`}>
      <Image src={src} alt={alt} fill className="object-cover"/>
    </div>
  );
};

export default RelativeImage;
