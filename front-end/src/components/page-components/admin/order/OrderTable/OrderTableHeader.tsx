import {OrderSummary} from "@/utils2/types/Order";
import {ColumnDef} from "@tanstack/react-table";
import {useEffect, useMemo, useState} from "react";
import {formatDateTime} from "@/utils2/functions/DateFormatter";
import {IOrder} from "@/utils2/types";
import {FiMoreHorizontal} from "react-icons/fi";
import Link from "next/link";

export interface IOrderColumn extends IOrder {
  total: number;
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
  {
    header: "Actions",
    accessorFn: (data) => {
      return (
        <Link href={`/admin/orders/${data._id}`}>
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

export default orderTableColumns;
