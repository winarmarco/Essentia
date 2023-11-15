
import AdminLayout from '@/components/layout/AdminLayout'
import Order from '@/components/page-components/admin/order/Order'
import { transformToOrderTableData } from '@/utils/functions/extractStatistics';
import React from 'react'

const OrderAdminPage = async () => {
  const res = await fetch("http://localhost:3000/api/order", {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store"
  });
  const data = await res.json();

  const orderData = transformToOrderTableData(data);

  return (
    <AdminLayout>
      <Order orderData={orderData}/>
    </AdminLayout>
  )
}


export default OrderAdminPage