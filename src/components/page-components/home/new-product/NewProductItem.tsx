import Button from "@/components/common/Button";
import RelativeImage from "@/components/common/relative-image/RelativeImage";
import NewProductType from "@/types/NewProduct";
import Image from "next/image";

const NewProductItem: React.FC<{newProduct: NewProductType}> = ({newProduct}) => {
  const alignment = (newProduct.align === "left") ? "sm:flex-row" : "sm:flex-row-reverse";
  const textAlignment = `sm:text-${newProduct.align}`;

  return (
    <div className={`w-full flex flex-col ${alignment} newProducts-center justify-between mt-20`}>

      <RelativeImage src={newProduct.image[0]} alt="Aria" className="w-full sm:w-[400px] h-[400px]"/>
      <div className={`mt-5 w-full sm:w-1/3 text-left ${textAlignment}`}>
        <h1 className="text-3xl font-medium">{newProduct.title}</h1>
        <p className="leading-loose mt-2">
          {newProduct.description}
        </p>
        <Button className="mt-8" filled>Learn more</Button>
      </div>
    </div>
  );
};

export default NewProductItem;