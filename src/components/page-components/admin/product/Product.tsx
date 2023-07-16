import Button from "@/components/common/Button";
import productTableColumns from "./ProductTable/ProductTableHeader";
import DataTable from "@/components/common/DataTable/DataTable";
import { productData } from "@/utils/dummy-data/dummyProductData";
import Image from "next/image";
import RelativeImage from "@/components/common/relative-image/RelativeImage";
import { AiFillEdit } from "react-icons/ai";
import ProductTable from "./ProductTable/ProductTable";

const ProductAdmin = () => {


  const data = productData.map((product) => {
    return {
      images: product.images,
      name: product.name,
      price: product.price,
      quantity: 10,
      category: "Sofa",
  }});

  return (
    <div className="flex flex-col gap-y-10 w-full h-full">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold">Product List</h1>
        <Button filled>+ Add Product</Button>
      </div>
      <ProductTable productData={data}/>
    </div>
  );
};

export default ProductAdmin;