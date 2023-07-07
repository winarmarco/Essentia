import { StaticImageData } from "next/image";

type Product = {
  title: string,
  description: string,
  shortDescription?: string | "",
  images: (string | StaticImageData)[];
  price: number,
}

export default Product;