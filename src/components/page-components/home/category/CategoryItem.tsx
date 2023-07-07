import CategoryItemType from "@/types/CategoryItem";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";

const CategoryItem: React.FC<CategoryItemType> = ({title, href}) => {
  return (
    <div className="group border-b border-gray-300">
      <Link href={href} className="flex justify-between py-5">
        <span className="text-2xl group-hover:scale-110 transition-all duration-300">
          {title}
        </span>

        <AiOutlineArrowRight className="text-2xl mr-4 group-hover:mx-0 transition-all duration-300" />
      </Link>
    </div>
  );
}

export default CategoryItem