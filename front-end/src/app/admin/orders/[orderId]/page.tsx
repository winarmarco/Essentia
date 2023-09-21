"use client";
import AdminLayout from '@/components/layout/AdminLayout';
import OrderDetails from '@/components/page-components/admin/order-details/OrderDetails';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const AdminOrderDetailsPage =  () => {
  const searchParams = useParams();
  const orderId = searchParams["orderId"];


  const [orderData, setOrderData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/api/order/${orderId}`, {
        headers: {
          "Content-Type": "application/json",
        }
      })
    
      const orderData = await res.json();

      setOrderData(orderData);
    }

    fetchData();
  }, []);

  console.log({orderData});
  
  return (
    <AdminLayout>
      {orderData && <OrderDetails order={orderData} /> }
    </AdminLayout>    
  )
}

export default AdminOrderDetailsPage;