import {OrderSummary} from "@/utils/types/Order";
import {ColumnDef} from "@tanstack/react-table";
import {useEffect, useMemo, useState} from "react";
import { formatDate } from "@/utils/functions/DateFormatter";

const orderTableColumns: ColumnDef<OrderSummary>[] = [
  {
    header: "Order ID",
    cell: (row) => row.renderValue(),
    accessorKey: "orderID",
  },
  {
    header: "Date",
    accessorFn: (data) => {
      const date = data["DateOrdered"];
      return <span>{formatDate(date)}</span>;
    },
    cell: (row) => row.renderValue(),
    accessorKey: "DateOrdered",
  },
  {
    header: "First Name",
    cell: (row) => row.renderValue(),
    accessorKey: "firstName",
  },
  {
    header: "Last Name",
    cell: (row) => row.renderValue(),
    accessorKey: "lastName",
  },
  {
    header: "Total",
    cell: (row) => row.renderValue(),
    accessorKey: "total",
  },
  {
    header: "Status",
    cell: (row) => row.renderValue(),
    accessorKey: "status",
  },
];

export default orderTableColumns;
