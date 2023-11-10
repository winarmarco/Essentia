import {ICart} from "../types/cart";
import {IDiscountCoupon} from "../types/discountCoupon";

export const fetchInvoice = async (token: string, invoiceId: string) => {
  const response = await fetch(`http://localhost:3000/invoice/${invoiceId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  const {data} = await response.json();

  console.log(data);
  return data;
};

export const createInvoice = async (
  token: string,
  cart: ICart,
  discountCode?: IDiscountCoupon["discountCode"]
) => {
  try {
    const response = await fetch("http://localhost:3000/invoice", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({cart, discountCoupon: {discountCode}}),
    });

    const {data} = await response.json();

    console.log({data});
    return data;
  } catch (error) {}
};
