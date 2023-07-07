import React from "react";
import Container from "../../../common/Container";
import Link from "next/link";
import {AiOutlineRight} from "react-icons/ai";
import RelativeImage from "@/components/common/relative-image/RelativeImage";

const Feature = () => {
  return (
    <div className="overflow-hidden h-[500px] relative flex items-center">
      <div className="absolute inset-0">
        <RelativeImage
          src={"/image 43.jpg"}
          alt="yellow chair"
          className="w-full h-full"
        />
      </div>

      <Container className="z-10 text-white">
        <p>Iconic furniture handmade in Italy</p>
        <h1 className="text text-4xl font-normal mb-3">Timeless Design</h1>
        <Link href="">
          <span className="flex flex-row gap-x-[2px] items-center w-fit border-b-[1px] pb-[0.5px]">
            Explore product
            <AiOutlineRight />
          </span>
        </Link>
      </Container>
    </div>
  );
};

export default Feature;
