import Product from "@/types/Product";
import Image from "next/image";

const ProductCard: React.FC<Product> = ({name, images}) => {
  return (
    <div className="flex flex-col h-min group cursor-pointer">
      <div className="relative w-full h-[300px]">
        <Image
          className="absolute h-full object-cover"
          src={images[1]}
          alt={name}
          fill={true}
        />
        <Image
          className="z-10 relative h-full object-cover group-hover:opacity-0 transition-opacity duration-500"
          src={images[0]}
          alt={name}
          fill={true}
        />
      </div>
      <h4 className="mt-2 text-2xl font-semibold group-hover:underline">{name}</h4>
    </div>
  );
};

export default ProductCard