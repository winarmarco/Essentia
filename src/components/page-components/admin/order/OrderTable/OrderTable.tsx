import DataTable from "@/components/common/DataTable/DataTable";
import {OrderSummary} from "@/types/Order";
import React, {useMemo} from "react";
import orderTableColumns from "./OrderTableHeader";

type OrderTableProps = {ordersData: OrderSummary[]; initPageSize?: number};

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
