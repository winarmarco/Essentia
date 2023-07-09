import {OrderSummary} from "@/types/Order";
import {ColumnDef} from "@tanstack/react-table";
import {useEffect, useMemo, useState} from "react";

const DateCell: React.FC<{ row: any }> = ({ row }) => {
  const [dateString, setDateString] = useState<string | null>(null);

  useEffect(() => {
    const date = row.getValue();
    setDateString(`${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`);
  }, [row]);

  return <div>{dateString}</div>;
};


const recentOrderColumns: ColumnDef<OrderSummary>[] = [
  {
    header: "Order ID",
    cell: (row) => row.renderValue(),
    accessorKey: "orderID",
  },
  {
    header: "Date",
    cell: (row) => {
      return <DateCell row={row} />
    },
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

export default recentOrderColumns;
