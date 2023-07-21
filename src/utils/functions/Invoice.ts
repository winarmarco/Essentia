import DiscountType from "@/utils/types/DiscountType";
import InvoiceType from "@/utils/types/Invoice";
import { IDiscountCouponClient, IShoppingCart } from "../types";
import { IDiscountCoupon } from "../types";
import { IInvoice } from "../../../server/model/Invoice";

const calculateSubtotals = (cart: IShoppingCart) => {
  const {items} = cart;

  // calculate the subtotal
  let subtotal = 0;
  items.forEach((cartItem) => {
    const { item } = cartItem;
    subtotal += cartItem.quantity * item.price;
  });

  return subtotal;
};

const calculateDiscountDollar = (subtotal: number, discount: IDiscountCouponClient | IDiscountCoupon) => {
  const TO_PERENTAGE = 0.01;

  // if it is a percentage discount, calculate it
  // else discount is a dollar amonut

  const discountAmount = discount.percentAmount
    ? subtotal * Number(discount.discountAmount) * TO_PERENTAGE
    : discount.discountAmount;

  return Number(discountAmount);
};

const calculateTotal = (invoice: IInvoice) => {
  const subtotals = calculateSubtotals(invoice.cart);
  const discountDollarAmount = calculateDiscountDollar(subtotals, invoice.discountCode);

  return Math.round(subtotals - discountDollarAmount);
}


export {calculateDiscountDollar, calculateSubtotals, calculateTotal};