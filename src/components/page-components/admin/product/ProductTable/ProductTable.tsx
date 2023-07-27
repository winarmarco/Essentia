import React, {useMemo} from "react";
import productTableColumns, {ProductTableType} from "./ProductTableHeader";
import {ColumnDef} from "@tanstack/react-table";
import DataTable from "@/components/shared/DataTable/DataTable";

const ProductTable: React.FC<{productData: ProductTableType[]}> = ({
  productData,
}) => {
  const columns = useMemo<ColumnDef<ProductTableType>[]>(() => productTableColumns,[]);


  return <DataTable data={productData} columns={columns} />;
};

export default ProductTable;
