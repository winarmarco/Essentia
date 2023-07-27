import DataTable from "@/components/shared/DataTable/DataTable";
import React, {useMemo} from "react";
import orderTableColumns, { IOrderColumn } from "./OrderTableHeader";

type OrderTableProps = {ordersData: IOrderColumn[]; initPageSize?: number};

const OrderTable: React.FC<OrderTableProps> = ({ordersData, initPageSize = 10}) => {
  const columns = useMemo(() => orderTableColumns, []);

  return (
    <DataTable
      data={ordersData}
      columns={columns}
      initPageSize={initPageSize}
    />
  );
};

export default OrderTable;
