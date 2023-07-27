"use client";
import React, {useEffect} from "react";
import "../globals.css";
import Navbar from "@/components/shared/navbar/Navbar";
import Container from "@/components/shared/Container";
import Footer from "@/components/shared/footer/Footer";
import Invoice from "@/components/page-components/cart/invoice/Invoice";
import CheckoutForm from "@/components/page-components/checkout/checkout-form/CheckoutForm";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/utils/redux/store";
import { fetchCart } from "@/utils/redux/Cart/CartActions";
import Loading from "@/components/shared/loading/Loading";

const Checkout = () => {
  const disptach =  useDispatch<AppDispatch>();
  const router = useRouter();
  const cart = useSelector((state: RootState) => state.cart);
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (auth.isAuthenticated) {
      disptach(fetchCart());
    } else {
      router.push("/auth/login");
    }
  }, [disptach, auth, router]);


  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <div className="sticky top-0 z-30 bg-white">
        <Navbar />
      </div>
      <Container className="w-full flex flex-col flex-1 bg-white">
        <div className="flex flex-col md:flex-row w-full flex-grow gap-x-20 mt-8">
          <div className="w-2/3">
            <span>{"< Edit Cart"}</span>
            <CheckoutForm />
          </div>
          <div className="w-1/3 sticky flex-grow top-[10rem] h-full">
            {(cart.hasFetched && !cart.isLoading) ? <Invoice cart={cart} /> : <Loading />}
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Checkout;
