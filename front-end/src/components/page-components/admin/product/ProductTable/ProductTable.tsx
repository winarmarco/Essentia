import React, {useMemo} from "react";
import productTableColumns from "./ProductTableHeader";
import {ColumnDef} from "@tanstack/react-table";
import DataTable from "@/components/shared/DataTable/DataTable";
import {IProduct} from "@/utils/types";

const ProductTable: React.FC<{productData: IProduct[]}> = ({productData}) => {
  const columns = useMemo<ColumnDef<IProduct>[]>(() => productTableColumns, []);

  return <DataTable data={productData} columns={columns} />;
};

export default ProductTable;
