import { StaticImageData } from "next/image";

type Product = {
  title: string,
  description: string,
  shortDescription?: string | "",
  image: string[] | StaticImageData[],
  price: number,
}

export default Product;