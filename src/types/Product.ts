import { StaticImageData } from "next/image";

type Product = {
  name: string,
  description: string,
  category: string,
  shortDescription?: string | "",
  images: string[];
  featuredOnLandingCarousel?: boolean,
  newProduct?: boolean,
  price: number,
}

export default Product;