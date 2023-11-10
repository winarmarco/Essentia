import React from "react";
import "../../globals.css";
import Navbar from "@/components/shared/navbar/Navbar";
import Container from "@/components/shared/Container";
import Footer from "@/components/shared/footer/Footer";
import Invoice from "@/components/page-components/cart/invoice/Invoice";
import CheckoutForm from "@/components/page-components/checkout/checkout-form/CheckoutForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { fetchCart } from "@/utils/actions/cart-action";
import { fetchInvoice } from "@/utils/actions/invoice-action";

const Checkout = async ({params} : {params: {invoiceId: string}}) => {
  const session = await getServerSession(authOptions);
  const {token} = session?.user;
  const fetchedInvoice = await fetchInvoice(token.id, params.invoiceId);
  const {invoice, totalDiscountAmount, totalPrice} = fetchedInvoice;
  const {items, discountCoupon} = invoice;
  
  // console.log(fetchedInvoice);


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
            <Invoice cart={{items}} subTotalPrice={totalPrice} discountCoupon={discountCoupon} discountAmount={totalDiscountAmount}/>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Checkout;
