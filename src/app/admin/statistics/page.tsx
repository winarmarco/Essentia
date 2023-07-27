import AdminLayout from "@/components/layout/AdminLayout";
import StatisticAdmin from "@/components/page-components/admin/Statistic/Statistic";
import { extractStatistics } from "@/utils/functions/extractStatistics";
import {IOrder} from "@/utils/types";
import React from "react";

const StatisticsPage = async () => {
  const res = await fetch("http://localhost:3000/api/order", {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store"
  });
  const data: IOrder[] = await res.json();

  const statistics = extractStatistics(data);

  return (
    <AdminLayout>
      <StatisticAdmin
        recentOrderData={statistics.recentOrderData}
        salesTrendsData={statistics.salesTrendsData}
        totalOrder={statistics.totalOrder}
        totalSales={statistics.totalSales}
      />
    </AdminLayout>
  );
};

export default StatisticsPage;
