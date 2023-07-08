import DiscountType from "./DiscountType";
import ShoppingCartType from "./ShoppingCart"

type InvoiceType = {
  cart: ShoppingCartType;
  discount?: DiscountType;
}

export default InvoiceType