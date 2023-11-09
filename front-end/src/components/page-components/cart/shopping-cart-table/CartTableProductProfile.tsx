import { IProduct } from "@/utils/types/products";
import ShoppingCartType, {ShoppingCartItemType} from "@/utils2/types/ShoppingCart";


const CartProductProfile: React.FC<{product: IProduct}> = ({product}) => {
  const {name, category} = product;

  const categoryName = typeof category === 'object' && category ? category.name : 'Unknown Category';

  return (
    <div className="flex-1 ml-5 md:ml-10 text-left flex flex-col">
      <span className="flex-1 text-left">{name}</span>
      <span className="text-sm text-gray-400">{categoryName}</span>
    </div>
  );
};


export default CartProductProfile;