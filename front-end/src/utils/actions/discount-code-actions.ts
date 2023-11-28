export const fetchDiscountCoupon = async (token: string, discountCode: string) => {
  const response = await fetch(`http://localhost:3000/discount-coupon/${discountCode}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  });

  const resData = await response.json();
  
  if (!response.ok) throw new Error(JSON.stringify(resData));

  const {data} = resData;

  return data;

}