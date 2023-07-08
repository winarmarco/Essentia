import { StaticImageData } from "next/image";

type Product = {
  name: string,
  description: string,
  category: string,
  shortDescription?: string | "",
  images: (string | StaticImageData)[];
  price: number,
}

export default Product;