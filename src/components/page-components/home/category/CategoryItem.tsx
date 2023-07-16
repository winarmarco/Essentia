import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import { IProductCategory } from "@/utils/types";


const CategoryItem: React.FC<IProductCategory> = ({name, categoryKey}) => {
  return (
    <div className="group border-b border-gray-300">
      <Link href={`/products?category=${categoryKey}`} className="flex justify-between py-5">
        <span className="text-2xl group-hover:scale-110 transition-all duration-300">
          {name}
        </span>

        <AiOutlineArrowRight className="text-2xl mr-4 group-hover:mx-0 transition-all duration-300" />
      </Link>
    </div>
  );
}

export default CategoryItem