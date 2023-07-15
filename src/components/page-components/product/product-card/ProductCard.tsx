import Product from "@/types/Product";
import Image from "next/image";
import Link from "next/link";

interface ProductCardType {
  name: string,
  _id: string,
  images: string[]
}

const ProductCard: React.FC<ProductCardType> = ({_id, name, images}) => {
  return (
    <Link href={`/products/${_id}`} >
      <div className="flex flex-col h-min group">
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
        <h4 className="mt-2 text-2xl font-semibold group-hover:underline">
          {name}
        </h4>
      </div>
    </Link>
  );
};

export default ProductCard;
