import React from "react";
import "../globals.css";
import Navbar from "@/components/shared/navbar/Navbar";
import Container from "@/components/shared/Container";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";
import Main from "@/components/shared/main/Main";
import Invoice from "@/components/page-components/cart/invoice/Invoice";
import CartTable from "@/components/page-components/cart/shopping-cart-table/CartTable";
import CouponInput from "@/components/page-components/cart/coupon-input/CouponInput";
import { fetchCart } from "@/utils/actions/cart-action";
import Link from "next/link";
import Button from "@/components/shared/Button";
import { IInvoice } from "@/utils/types/Invoice";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { TotalPriceSection } from "@/components/page-components/cart/total-price-section/TotalPriceSection";
import { redirect } from "next/navigation";


const Cart: React.FC<{invoice: IInvoice}> = async () => {
  const session = await getServerSession(authOptions);
  const {token} = session?.user;
  const fetchedCart = await fetchCart(token.id);
  const {cart, totalPrice} = fetchedCart;

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <Header className="sticky top-0 z-30 bg-white">
        <Navbar />
      </Header>
      <Main className="flex-grow">
        <Container className="w-full flex flex-col bg-white">
          <div className="flex flex-col md:flex-row w-full flex-grow gap-x-20">
            <div className="w-2/3">
              <CartTable items={cart.items} />
            </div>
            <div className="w-1/3 sticky flex-grow top-[10rem] h-full">
              <TotalPriceSection cart={cart} totalPrice={totalPrice}/>
            </div>
          </div>
        </Container>
      </Main>
      <Footer />
    </div>
  );
};

export default Cart;
