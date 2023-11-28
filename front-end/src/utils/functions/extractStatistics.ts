import * as z from "zod";
import {IOrderColumn} from "@/components/page-components/admin/order/OrderTable/OrderTableHeader";
import {formatDate} from "./DateFormatter";
import {ChartData} from "chart.js";
import { IOrder, OrderSchema } from "../types/order";

export const FetchedOrderSchema = OrderSchema.extend({
  subTotal: z.number(),
  discountDollarAmount: z.number(),
  total: z.number(),
})

export type IFetchedOrder = z.infer<typeof FetchedOrderSchema>;

export const transformToOrderTableData = (orderData: IFetchedOrder[]) => {
  // Transform orderData to type of IOrderColumn[], to be presented in
  // order table
  const recentOrderData: IOrderColumn[] = orderData.map((order) => {
    return {
      ...order,
    };
  });

  return recentOrderData;
};

export const extractSalesTrends = (orderData: IFetchedOrder[]) => {
  // Extract the sales trends data to be plotted in the sales trends graph
  const salesTrendsData: ChartData<"line", {x: string; y: number}[]> = {
    datasets: [
      {
        // transform orderData to x: date formatted string, and y: sales per day
        data: orderData.map((order) => {
          return {
            x: formatDate(new Date(order.dateOrdered), '-').toString(),
            y: order.total,
          };
        }),
        borderColor: "#000000",
        tension: 0.2,
      },
    ],
  };

  return salesTrendsData;
};


export const extractStatistics = (orderData: IFetchedOrder[]) => {
  console.log(orderData);
  // Transform to order table data
  const recentOrderData: IOrderColumn[] = transformToOrderTableData(orderData);

  // Extract sales trends data
  const salesTrendsData: ChartData<"line", {x: string; y: number}[]> = extractSalesTrends(orderData);

  // Extract the total order
  const totalOrder = orderData.length;

  // Extract the total sales
  const totalSales = orderData.reduce((acc, el) => {
    return acc + el.total;
  }, 0);

  return {
    recentOrderData,
    salesTrendsData,
    totalOrder,
    totalSales,
  };
};
