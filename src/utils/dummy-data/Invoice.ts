import { productData } from "@/dummyProductData";
import DiscountType from "@/types/DiscountType";
import InvoiceType from "@/types/Invoice";
import ShoppingCartType from "@/types/ShoppingCart";

const items: ShoppingCartType["items"] = [
  {
    product: productData[0],
    quantity: 1,
  },
  {
    product: productData[1],
    quantity: 3,
  },
  {
    product: productData[1],
    quantity: 3,
  },
  {
    product: productData[1],
    quantity: 3,
  },
  {
    product: productData[1],
    quantity: 3,
  },
  {
    product: productData[1],
    quantity: 3,
  },
];

const cart: ShoppingCartType = {
  items: items,
}

const discount: DiscountType = {
  discountCode: "July Fest",
  amount: 10,
  percent: true,
};

const invoiceDummyData: InvoiceType = {
  cart: cart,
  discount: discount,
}


export {invoiceDummyData}