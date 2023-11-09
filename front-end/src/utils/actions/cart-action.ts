export const fetchCart = async (token: string) => {
  const response  = await fetch("http://localhost:3000/cart", {
    headers: {
      "Authorization": `Bearer ${token}`
    },
  })

  const { data } = await response.json();

  return data;
};


export const addToCart = async (token: string, productId: string) => {
  const response = await fetch("http://localhost:3000/cart/add",  {
    method: "POST",
    body: JSON.stringify({product: {_id: productId}}),
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })

  const { data } = await response.json();

  return data;
}

export const removeFromCart = async (token: string, productId: string) => {
  const response = await fetch("http://localhost:3000/cart/remove",  {
    method: "POST",
    body: JSON.stringify({product: {_id: productId}}),
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })

  const { data } = await response.json();

  return data;
}