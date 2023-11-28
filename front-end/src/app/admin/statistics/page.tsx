import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import AdminLayout from "@/components/layout/AdminLayout";
import StatisticAdmin from "@/components/page-components/admin/Statistic/Statistic";
import {fetchOrders} from "@/utils/actions/order-action";
import {extractStatistics} from "@/utils/functions/extractStatistics";
import {getServerSession} from "next-auth";
import {notFound} from "next/navigation";
import React from "react";

const StatisticsPage = async () => {
  const session = await getServerSession(authOptions);
  const {token} = session?.user;
  const fetchedOrder = await fetchOrders(token.id);

  if (!fetchedOrder) return notFound();

  const statistics = extractStatistics(fetchedOrder.orders);

  return (
    <StatisticAdmin
      recentOrderData={statistics.recentOrderData}
      salesTrendsData={statistics.salesTrendsData}
      totalOrder={statistics.totalOrder}
      totalSales={statistics.totalSales}
    />
  );
};

export default StatisticsPage;
