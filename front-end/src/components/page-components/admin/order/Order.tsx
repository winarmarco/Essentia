"use client";
import { recentOrderDummyData } from "@/utils2/dummy-data/RecentOrder";
import OrderTable from "./OrderTable/OrderTable";
import { IOrderColumn } from "./OrderTable/OrderTableHeader";

const Order: React.FC<{orderData: IOrderColumn[]}> = ({orderData}) => {
  return (
    <div className="flex flex-col w-full h-full gap-y-10">
      <h1 className="text-3xl font-bold">Order List</h1>
      <OrderTable ordersData={orderData} initPageSize={20} />
    </div>
  );
};

export default Order;