import { IProduct, ProductSchema } from "../types/products";

export const fetchProduct = async () => {
  try {
    const response = await fetch(`${process.env.API_URL}/products`);
  
    const {data} =  await response.json();
  
    return data.products;
  } catch (error) {
    
  }
  
};

export const fetchLandingProducts = async () => {
  const response = await fetch(`${process.env.API_URL}/products`);
  const {data} = await response.json();


    const {products} = data;

    const carouselProducts = (products as IProduct[]).filter((product) => {
      return (product.showOnLandingCarousel);
    })

    const newProducts = (products as IProduct[]).filter((product) => {
      return (product.newProduct);
    })

    return {carouselProducts, newProducts};
}

export const fetchProductDetails = async (_id: IProduct["_id"]) => {
  const response = await fetch(`http://localhost:3000/products/${_id}`, {
    headers: {
      "Content-Type": "application/json",
    }
  });

  const {data} = await response.json();

  return data;
}

export const createProduct = async (token: string, formData: FormData) => {
  await new Promise(resolve => setTimeout(resolve, 3000));
  const response = await fetch(`http://localhost:3000/products`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: formData,
  })

  const resData = await response.json();

  if (!response.ok) throw new Error(JSON.stringify(resData.message));

  const {data} = resData;

  return data;
}

export const updateProduct = async (token: string, productId: string, formData: FormData) => {
  await new Promise(resolve => setTimeout(resolve, 5000));
  const response = await fetch(`http://localhost:3000/products/${productId}`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: formData,
  })

  const resData = await response.json();

  if (!response.ok) throw new Error(JSON.stringify(resData.message));

  const {data} = resData;

  return true
}