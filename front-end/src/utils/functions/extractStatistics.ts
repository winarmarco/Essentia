import {IOrderColumn} from "@/components/page-components/admin/order/OrderTable/OrderTableHeader";
import {IOrder} from "../types";
import {calculateTotal} from "./Invoice";
import {formatDate} from "./DateFormatter";
import {ChartData} from "chart.js";

export const transformToOrderTableData = (orderData: IOrder[]) => {
  // Transform orderData to type of IOrderColumn[], to be presented in
  // order table
  const recentOrderData: IOrderColumn[] = orderData.map((el) => {
    return {
      ...el,
      total: calculateTotal(el.invoice),
      dateOrdered: new Date(el.dateOrdered),
    };
  });

  return recentOrderData;
};

export const extractSalesTrends = (orderData: IOrder[]) => {
  // Extract the sales trends data to be plotted in the sales trends graph
  const salesTrendsData: ChartData<"line", {x: string; y: number}[]> = {
    datasets: [
      {
        // transform orderData to x: date formatted string, and y: sales per day
        data: orderData.map((el) => {
          return {
            x: formatDate(new Date(el.dateOrdered), '-').toString(),
            y: calculateTotal(el.invoice),
          };
        }),
        borderColor: "#000000",
        tension: 0.2,
      },
    ],
  };

  return salesTrendsData;
};

export const extractStatistics = (orderData: IOrder[]) => {
  // Transform to order table data
  const recentOrderData: IOrderColumn[] = transformToOrderTableData(orderData);

  // Extract sales trends data
  const salesTrendsData: ChartData<"line", {x: string; y: number}[]> = extractSalesTrends(orderData);

  // Extract the total order
  const totalOrder = orderData.length;

  // Extract the total sales
  const totalSales = orderData.reduce((acc, el) => {
    return acc + calculateTotal(el.invoice);
  }, 0);

  return {
    recentOrderData,
    salesTrendsData,
    totalOrder,
    totalSales,
  };
};
