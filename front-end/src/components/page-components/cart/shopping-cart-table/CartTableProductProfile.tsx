import { IProduct } from "@/utils/types";
import ShoppingCartType, {ShoppingCartItemType} from "@/utils/types/ShoppingCart";

type ProductProfileProps = Pick<IProduct, "name" | "category">;

const CartProductProfile: React.FC<ProductProfileProps> = ({name, category}) => {
  return (
    <div className="flex-1 ml-5 md:ml-10 text-left flex flex-col">
      <span className="flex-1 text-left">{name}</span>
      <span className="text-sm text-gray-400">{category.name}</span>
    </div>
  );
};


export default CartProductProfile;