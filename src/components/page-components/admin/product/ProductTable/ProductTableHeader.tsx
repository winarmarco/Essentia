import {ColumnDef} from "@tanstack/react-table";
import ShoppingCartType, {ShoppingCartItemType} from "@/types/ShoppingCart";
import RelativeImage from "@/components/common/relative-image/RelativeImage";
import Product from "@/types/Product";
import {AiFillEdit} from "react-icons/ai";

interface ProductTableType {
  images: Product["images"];
  name: Product["name"];
  price: Product["price"];
  quantity: number;
  category: Product["category"];
}

const productTableColumns: ColumnDef<ProductTableType>[] = [
  {
    header: "Image",
    cell: (row) => row.renderValue(),
    accessorFn: (data) => {
      const images = data["images"];
      return (
        <RelativeImage
          className="w-[50px] h-[50px] mx-auto"
          src={images[0]}
          alt={"product-image"}
        />
      );
    },
    accessorKey: "images",
  },
  {
    header: "Product",
    cell: (row) => row.renderValue(),
    accessorKey: "name",
  },
  {
    header: "Category",
    cell: (row) => row.renderValue(),
    accessorKey: "category",
  },
  {
    header: "Price",
    accessorFn: (data) => {
      return `$ ${data["price"]}`
    },
    cell: (row) => row.renderValue(),
    accessorKey: "price",
  },
  {
    header: "Quantity",
    cell: (row) => row.renderValue(),
    accessorKey: "quantity",
  },
];

export default productTableColumns;
export type {ProductTableType};
