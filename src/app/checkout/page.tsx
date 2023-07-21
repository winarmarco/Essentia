import React, {HTMLInputTypeAttribute} from "react";
import "../globals.css";
import Navbar from "@/components/common/navbar/Navbar";
import Container from "@/components/common/Container";
import Footer from "@/components/common/footer/Footer";
import Invoice from "@/components/page-components/cart/invoice/Invoice";
import {invoiceDummyData} from "@/utils/dummy-data/Invoice";
import CheckoutForm from "@/components/page-components/checkout/checkout-form/CheckoutForm";

const Checkout = () => {
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
            <Invoice />
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Checkout;
