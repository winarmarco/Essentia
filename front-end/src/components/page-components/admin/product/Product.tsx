"use client";

import Button from "@/components/shared/Button";
import ProductTable from "./ProductTable/ProductTable";
import {IProduct} from "@/utils/types";
import Link from "next/link";

const ProductAdmin: React.FC<{productData: IProduct[]}> = ({productData}) => {
  return (
    <div className="flex flex-col gap-y-10 w-full h-full">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold">Product List</h1>
        <Link href="/admin/products/add">
          <Button filled>+ Add Product</Button>
        </Link>
      </div>
      <ProductTable productData={productData} />
    </div>
  );
};

export default ProductAdmin;
