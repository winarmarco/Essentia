"use client";

import React, {useEffect, useState} from "react";
import "../globals.css";
import Navbar from "@/components/shared/navbar/Navbar";
import Container from "@/components/shared/Container";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";
import Main from "@/components/shared/main/Main";
import Invoice, { IInvoiceItem } from "@/components/page-components/cart/invoice/Invoice";
import CartTable from "@/components/page-components/cart/shopping-cart-table/CartTable";
import CouponInput from "@/components/page-components/cart/coupon-input/CouponInput";
import {fetchCart} from "@/utils/actions/cart-action";
import Button from "@/components/shared/Button";
import {createInvoice} from "@/utils/actions/invoice-action";
import {useSelector} from "react-redux";
import {useSession} from "next-auth/react";
import Loading from "@/components/shared/loading/Loading";
import {ICart} from "@/utils/types/cart";
import {RootState} from "@/utils/redux/store";
import {useRouter} from "next/navigation";

const Cart = () => {
  const {data: session} = useSession();
  const router = useRouter();
  const [cart, setCart] = useState<ICart>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const discountCouponState = useSelector(
    (state: RootState) => state.discountCoupon
  );
  const discountAmount = discountCouponState.totalDiscountAmount || 0;
  const discountCoupon = discountCouponState.discountCoupon;
  
  const invoiceItems: IInvoiceItem[] = cart ? cart.items.map((cartItem) => {
    const {quantity} = cartItem;
    const {name, price} = cartItem.item;
    return  {name, price, quantity};
  }) : [];

  useEffect(() => {
    const fetchData = async () => {
      if (session && session.user.token) {
        try {
          const {token} = session.user;
          const fetchedCart = await fetchCart(token.id);
          const {cart, totalPrice} = fetchedCart;
          setCart(cart);
          setTotalPrice(totalPrice);
        } catch (error) {
          // TODO: IMPLEMENT ERROR
        }
      }
    };

    fetchData();
  }, [session]);

  const checkoutHandler = async () => {
    if (session && session.user.token) {
      if (cart) {
        const {token} = session.user;
        const {discountCoupon} = discountCouponState;
        const {invoice} = await createInvoice(
          token.id,
          discountCoupon?.discountCode
        );

        router.refresh();
        return router.push(`/checkout/${invoice._id}`);
      }
    }
  };

  return (
    <Container className="w-full flex flex-col bg-white">
      <div className="flex flex-col md:flex-row w-full flex-grow gap-x-20">
        <div className="sm:w-2/3">
          {cart ? <CartTable items={cart.items} /> : <Loading />}
        </div>
        {cart && cart.items.length > 0 && (
          <div className="sm:w-1/3 sticky flex-grow top-[10rem] h-full">
            <Invoice
              items={invoiceItems}
              subTotalPrice={totalPrice}
              discountCoupon={discountCoupon}
              discountAmount={discountAmount}
            />
            <CouponInput />
            <Button
              onClick={checkoutHandler}
              className="mt-[8rem] w-full"
              filled
            >
              Checkout
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Cart;
