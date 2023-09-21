import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <div className="overflow-hidden py-40 relative flex justify-center items-center">
      <Image
        className="absolute inset-0 h-full object-cover"
        src="/image 35.jpg"
        alt="image 35.jpg"
        fill
      />
      <div className="absolute inset-0 bg-black bg-opacity-20 z-10"></div>
      <p className="px-10 text-center z-20 w-full sm:w-1/2 leading-loose text-white text-xl">
        “At Essentia, we embrace simplicity to elevate your everyday living with
        thoughtfully designed, timeless products that inspire and bring harmony
        to your space. Discover refined simplicity with Essentia”
      </p>
    </div>
  );
};

export default About;
