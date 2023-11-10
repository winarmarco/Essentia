import { NewProductItemType } from "@/components/page-components/home/new-product/NewProductItem";
import { productData } from "./dummyProductData";


const newProductData: NewProductItemType[] = [
  {
    alignment: "left",
    ...productData[0],
  },
  {
    alignment: "right",
    ...productData[1],
  }
];

export default newProductData;
