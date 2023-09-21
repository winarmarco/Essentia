"use client";

import React, {useEffect} from "react";
import "../globals.css";
import Navbar from "@/components/shared/navbar/Navbar";
import Container from "@/components/shared/Container";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";
import Main from "@/components/shared/main/Main";
import Invoice from "@/components/page-components/cart/invoice/Invoice";
import CartTable from "@/components/page-components/cart/shopping-cart-table/CartTable";
import CouponInput from "@/components/page-components/cart/coupon-input/CouponInput";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/utils/redux/store";
import {fetchCart} from "@/utils/redux/Cart/CartActions";
import Link from "next/link";
import Button from "@/components/shared/Button";
import {useRouter} from "next/navigation";
import Loading from "@/components/shared/loading/Loading";
import { authActions } from "@/utils/redux/Auth/AuthSlice";
import { IInvoice } from "@/utils/types";

const Cart: React.FC<{invoice: IInvoice}> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const cart = useSelector((state: RootState) => state.cart);
  const auth = useSelector((state: RootState) => state.auth);
  const discountCoupon = useSelector((state: RootState) => state.discountCoupon);

  useEffect(() => {
    try {
      if (auth.isAuthenticated) {
        dispatch(fetchCart()).unwrap();
      } else {
        router.push("/auth/login");
      }
    } catch (error) {
      dispatch(authActions.signOut());
      router.push("/auth/login");
    }
  }, [dispatch, auth, router]);

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <Header className="sticky top-0 z-30 bg-white">
        <Navbar />
      </Header>
      <Main className="flex-grow">
        {!cart.isLoading && cart.hasFetched ? (
          <Container className="w-full flex flex-col bg-white">
            <div className="flex flex-col md:flex-row w-full flex-grow gap-x-20">
              <div className="w-2/3">
                <CartTable items={cart.items} />
              </div>
              <div className="w-1/3 sticky flex-grow top-[10rem] h-full">
                <Invoice cart={cart} discountCoupon={discountCoupon} />
                <CouponInput />
                <Link href="/checkout">
                  <Button className="mt-[8rem] w-full" filled>
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        ) : (
          <Loading />
        )}
      </Main>
      <Footer />
    </div>
  );
};

export default Cart;
