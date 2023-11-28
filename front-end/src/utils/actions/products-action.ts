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
  const response = await fetch(`${process.env.API_URL}/products/${_id}`, {
    headers: {
      "Content-Type": "application/json",
    }
  });

  const {data} = await response.json();

  return data;
}
