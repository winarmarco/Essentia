import DiscountType from "@/types/DiscountType";
import ShoppingCartType from "@/types/ShoppingCart";

const calculateSubtotals = (cart: ShoppingCartType) => {
  const {items} = cart;

  // calculate the subtotal
  let subtotal = 0;
  items.forEach((item) => {
    const {product} = item;
    subtotal += item.quantity * product.price;
  });

  return subtotal;
};

const calculateDiscountDollar = (subtotal: number, discount: DiscountType) => {
  const TO_PERENTAGE = 0.01;

  // if it is a percentage discount, calculate it
  // else discount is a dollar amonut

  const discountAmount = discount.percent
    ? subtotal * discount.amount * TO_PERENTAGE
    : discount.amount;

  return discountAmount;
};


export {calculateDiscountDollar, calculateSubtotals};