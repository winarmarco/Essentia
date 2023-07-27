"use client";
import {OrderSummary} from "@/utils/types/Order";
import {ChartData} from "chart.js";
import StatisticBox from "./StatisticBox";
import {Line} from "react-chartjs-2";
import {salesTrendsDummyData} from "@/utils/dummy-data/StatisticAdmin";
import {recentOrderDummyData} from "@/utils/dummy-data/RecentOrder";
import {CategoryScale, TimeScale} from "chart.js";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";
import chartOptions from "./StatisticChartOptions";
import OrderTable from "../order/OrderTable/OrderTable";
import { IOrderColumn } from "../order/OrderTable/OrderTableHeader";

Chart.register(CategoryScale, TimeScale);

type StatisticAdminProps = {
  totalSales?: number;
  totalOrder?: number;
  salesTrendsData?: ChartData<"line", {x: string; y: number}[]>;
  recentOrderData: IOrderColumn[];
};

const StatisticAdmin: React.FC<StatisticAdminProps> = ({
  totalSales,
  totalOrder,
  salesTrendsData = salesTrendsDummyData,
  recentOrderData,
}) => {

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-5">
      <StatisticBox title="Total Sales">
        $ {totalSales},00
      </StatisticBox>
      <StatisticBox title="Total Orders">
        {totalOrder}
      </StatisticBox>
      <StatisticBox
        title="Sales Trends"
        titleClass="font-semibold mb-8"
        className="col-span-2 w-full h-[600px] flex"
      >
        <Line options={chartOptions} data={salesTrendsData} />
      </StatisticBox>
      <StatisticBox
        className="col-span-2"
        title="Recent Order"
        titleClass="font-semibold mb-8"
      >
        <OrderTable ordersData={recentOrderData}/>
      </StatisticBox>
    </div>
  );
};

export default StatisticAdmin;
