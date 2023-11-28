import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import AdminLayout from "@/components/layout/AdminLayout";
import Order from "@/components/page-components/admin/order/Order";
import {fetchOrder, fetchOrders} from "@/utils/actions/order-action";
import {transformToOrderTableData} from "@/utils/functions/extractStatistics";
import {getServerSession} from "next-auth";
import {notFound} from "next/navigation";
import React from "react";

const OrderAdminPage = async () => {
  const session = await getServerSession(authOptions);
  const {token} = session?.user;
  const fetchedOrder = await fetchOrders(token.id);

  if (!fetchedOrder) return notFound();

  const orderTableData = transformToOrderTableData(fetchedOrder.orders);

  return <Order orderData={orderTableData} />;
};

export default OrderAdminPage;
