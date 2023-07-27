import {OrderSummary} from "@/utils/types/Order";
import {ColumnDef} from "@tanstack/react-table";
import {useEffect, useMemo, useState} from "react";
import { formatDateTime } from "@/utils/functions/DateFormatter";
import { IOrder } from "@/utils/types";

export interface IOrderColumn extends IOrder {
  total: number,
}

const orderTableColumns: ColumnDef<IOrderColumn>[] = [
  {
    header: "Order ID",
    cell: (row) => row.renderValue(),
    accessorKey: "_id",
  },
  {
    header: "Date",
    accessorFn: (data) => {
      const date = data["dateOrdered"];
      return <span>{formatDateTime(date)}</span>;
    },
    cell: (row) => row.renderValue(),
    accessorKey: "dateOrdered",
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
