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

  const resData = await response.json();
  const {data} = resData;
  return data;
};

export const createInvoice = async (
  token: string,
  discountCode?: IDiscountCoupon["discountCode"]
) => {
  const response = await fetch("http://localhost:3000/invoice", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify({discountCoupon: {discountCode}}),
  });

  const resData = await response.json();

  if (!response.ok) throw new Error(JSON.stringify(resData));

  const {data} = resData;
  return data;
};
