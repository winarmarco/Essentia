"use client";

import React, { useEffect } from "react";
import "../globals.css";
import Navbar from "@/components/common/navbar/Navbar";
import Container from "@/components/common/Container";
import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/Header";
import Main from "@/components/common/main/Main";
import ShoppingCart from "@/utils/types/ShoppingCart";
import Invoice from "@/components/page-components/cart/invoice/Invoice";
import CartTable from "@/components/page-components/cart/shopping-cart-table/CartTable";
import InvoiceType from "@/utils/types/Invoice";
import CouponInput from "@/components/page-components/cart/coupon-input/CouponInput";
import { IInvoiceClient } from "@/utils/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utils/redux/store";
import { fetchCart } from "@/utils/redux/Cart/CartActions";

const Cart: React.FC<{invoice: InvoiceType}> = () => {
  const disptach =  useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    disptach(fetchCart());
  }, [disptach]);


  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <Header className="sticky top-0 z-30 bg-white">
        <Navbar />
      </Header>
      <Main className="flex-grow">
        <Container className="w-full flex flex-col bg-white">
          <div className="flex flex-col md:flex-row w-full flex-grow gap-x-20">
            <div className="w-2/3">
              {(!cart.isLoading && cart.hasFetched) ? <CartTable items={cart.items} /> :<div>Loading...</div>}
            </div>
            <div className="w-1/3 sticky flex-grow top-[10rem] h-full">
              <Invoice />
              <CouponInput />
            </div>
          </div>
        </Container>
      </Main>
      <Footer />
    </div>
  );
};
export default Cart;
