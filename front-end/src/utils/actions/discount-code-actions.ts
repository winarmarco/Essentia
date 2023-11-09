export const fetchDiscountCoupon = async (token: string, discountCode: string) => {
  const response = await fetch(`http://localhost:3000/discount-coupon/${discountCode}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  });
  const {data} = await response.json();
  return data;

}