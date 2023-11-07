import { productData } from "@/utils2/dummy-data/dummyProductData";
import DiscountType from "@/utils2/types/DiscountType";
import InvoiceType from "@/utils/types/Invoice";
import ShoppingCartType from "@/utils2/types/ShoppingCart";

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