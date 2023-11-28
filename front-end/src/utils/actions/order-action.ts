import { ICheckoutDetails } from "@/components/page-components/checkout/checkout-form/CheckoutForm";

export const createOrder = async (token: string, checkoutDetails: ICheckoutDetails) => {

  const response = await fetch(`${process.env.API_URL}/order`, {
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

export const fetchOrders = async (token: string) => {
  const response = await fetch(`${process.env.API_URL}/order`,  {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  })

  const orderData = await response.json();

  if (!response.ok) throw new Error(orderData.message);
  
  const {data} = orderData;

  return data;
}

export const fetchOrder = async (token: string, orderId: string) => {

  const response = await fetch(`http://localhost:3000/order/${orderId}`,  {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  })

  const orderData = await response.json();

  if (!response.ok) throw new Error(orderData.message);
  
  const {data} = orderData;

  return data;
}