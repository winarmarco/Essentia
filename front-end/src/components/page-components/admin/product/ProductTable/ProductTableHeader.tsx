import {ColumnDef} from "@tanstack/react-table";
import ShoppingCartType, {ShoppingCartItemType} from "@/utils2/types/ShoppingCart";
import RelativeImage from "@/components/shared/relative-image/RelativeImage";
import {AiFillEdit} from "react-icons/ai";
import { IProduct } from "@/utils2/types";
import { FiMoreHorizontal } from "react-icons/fi";
import Link from "next/link";


const productTableColumns: ColumnDef<IProduct>[] = [
  {
    header: "Image",
    cell: (row) => row.renderValue(),
    accessorFn: (data) => {
      const {images} = data;
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
    accessorKey: "stockQuantity",
  },
  {
    header: "Actions",
    accessorFn: (data) => {
      return (
        <Link href={`/admin/products/${data._id}`}>
          <span className="text-black flex justify-center">
            <FiMoreHorizontal />
          </span>
        </Link>
      );
    },
    cell: (row) => row.renderValue(),
    accessorKey: "",
  },
];

export default productTableColumns;
