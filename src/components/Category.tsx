import React from "react";
import Image from "next/image";
import blackCouchImg from "../../public/image 38.jpg";
import {AiOutlineArrowRight} from "react-icons/ai";
import Link from "next/link";

const categoryItemData = [
  {
    name: "BEDROOM",
  },
  {
    name: "LIVING ROOM",
  },
  {
    name: "OFFICE",
  },
  {
    name: "DINING",
  },
  {
    name: "OUTDOOR",
  },
];

const CategoryItem: React.FC<{itemName: string}> = (props) => {
  return (
    <div className="group">
      <Link href="/" className="flex justify-between py-5">
        <span className="text-2xl group-hover:scale-110 transition-all duration-300">
          {props.itemName}
        </span>
        <AiOutlineArrowRight className="text-2xl mr-4 group-hover:mx-0 transition-all duration-300" />
      </Link>
      <div className="h-0.5 w-full bg-black bg-opacity-20"></div>
    </div>
  );
};

const Category = () => {
  return (
    <div className="relative flex flex-col sm:flex-row my-20">
      <Image
        src={blackCouchImg}
        alt="blackCouchImage.png"
        className="w-full md:w-[50%] h-[600px] object-cover"
      />

      <div className="flex-1 p-20 flex flex-col ">
        <div className="relative">
          <h1 className="font-medium text-4xl underline underline-offset-8">
            CATEGORIES
          </h1>
        </div>
        <ul className="flex-1 justify-between h-full flex flex-col mt-10">
          {categoryItemData.map((item, index) => {
            return <CategoryItem key={index} itemName={item.name} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Category;
