import { recentOrderDummyData } from "@/utils/dummy-data/RecentOrder";
import OrderTable from "./OrderTable/OrderTable";

const Order = () => {

  return (
    <div className="flex flex-col w-full h-full gap-y-10">
      <h1 className="text-3xl font-bold">Order List</h1>
      <OrderTable ordersData={recentOrderDummyData} initPageSize={20} />
    </div>
  );
};

export default Order;