import {OrderSummary} from "@/utils/types/Order";
import {ChartData} from "chart.js";
import StatisticBox from "./StatisticBox";
import {Line} from "react-chartjs-2";
import {salesTrendsDummyData} from "@/utils/dummy-data/StatisticAdmin";
import {recentOrderDummyData} from "@/utils/dummy-data/RecentOrder";
import chartOptions from "./StatisticChartOptions";
import OrderTable from "../order/OrderTable/OrderTable";

type StatisticAdminProps = {
  totalSales?: number;
  totalOrder?: number;
  salesTrendsData?: ChartData<"line", {x: string; y: number}[]>;
  recentOrderData?: OrderSummary[];
};

const StatisticAdmin: React.FC<StatisticAdminProps> = ({
  totalSales,
  totalOrder,
  salesTrendsData = salesTrendsDummyData,
  recentOrderData = recentOrderDummyData,
}) => {

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-5">
      <StatisticBox title="Total Sales" content={"$ 10,000.00"} />
      <StatisticBox title="Total Orders" content={"300"} />
      <StatisticBox
        title="Sales Trends"
        titleClass="font-semibold mb-8"
        content={<Line options={chartOptions} data={salesTrendsData} />}
        className="col-span-2 w-full h-[600px] flex"
      />

      <StatisticBox
        className="col-span-2"
        title="Recent Order"
        titleClass="font-semibold mb-8"
        content={<OrderTable ordersData={recentOrderData}/>}
      />
    </div>
  );
};

export default StatisticAdmin;
