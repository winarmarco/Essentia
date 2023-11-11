import { ICheckoutDetails } from "@/components/page-components/checkout/checkout-form/CheckoutForm";

export const createOrder = async (token: string, checkoutDetails: ICheckoutDetails) => {

  const order = await fetch("http://localhost:3000/order", {
    method: "POST",
    body: JSON.stringify(checkoutDetails),
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  });

  const orderData = await order.json();

  const {data} = orderData;

  return data;
}