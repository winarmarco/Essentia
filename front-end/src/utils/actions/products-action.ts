import { IProduct, ProductSchema } from "../types/products";

export const fetchProduct = async () => {

  const response = await fetch("http://localhost:3000/products");

  const {data} =  await response.json();

  return data.products;
  
};

export const fetchLandingProducts = async () => {
  const response = await fetch("http://localhost:3000/products");
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
