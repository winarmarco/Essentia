"use client";
import AdminLayout from '@/components/layout/AdminLayout';
import OrderDetails from '@/components/page-components/admin/order-details/OrderDetails';
import Loading from '@/components/shared/loading/Loading';
import { fetchOrder } from '@/utils/actions/order-action';
import { useSession } from 'next-auth/react';
import { notFound, useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const AdminOrderDetailsPage =  () => {
  const searchParams = useParams();
  const router = useRouter();
  const {data: session} = useSession();
  const orderId = searchParams["orderId"];
  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (session && session.user.token) {
          const {token} = session.user;
          const fetchedOrder = await fetchOrder(token.id, orderId);
          
          if (!fetchedOrder) throw new Error("Cannot fetch order");

          const {order} = fetchedOrder;

          setOrderData(order);
        } else {
          router.push("/login");
        }

        } catch (error: any) {
          
        }

      setIsLoading(false);
    }

    fetchData();
  }, [orderId, session, router]);

  if (!isLoading && !orderData) return notFound();
  
  return (
    <>
      {isLoading && <Loading />}
      {(!isLoading && orderData) && <OrderDetails order={orderData}/>}
    </>
  )
}

export default AdminOrderDetailsPage;