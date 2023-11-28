import { ICheckoutDetails } from "@/components/page-components/checkout/checkout-form/CheckoutForm";

export const createOrder = async (token: string, checkoutDetails: ICheckoutDetails) => {

  const response = await fetch("http://localhost:3000/order", {
    method: "POST",
    body: JSON.stringify(checkoutDetails),
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  });

  
  const orderData = await response.json();

  if (!response.ok) throw new Error(orderData.message);
  
  const {data} = orderData;

  return data;
}