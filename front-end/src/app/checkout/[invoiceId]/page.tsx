import React from "react";
import "../../globals.css";
import Navbar from "@/components/shared/navbar/Navbar";
import Container from "@/components/shared/Container";
import Footer from "@/components/shared/footer/Footer";
import Invoice, { IInvoiceItem } from "@/components/page-components/cart/invoice/Invoice";
import CheckoutForm from "@/components/page-components/checkout/checkout-form/CheckoutForm";
import {getServerSession} from "next-auth";
import {authOptions} from "../../api/auth/[...nextauth]/route";
import {fetchCart} from "@/utils/actions/cart-action";
import {fetchInvoice} from "@/utils/actions/invoice-action";
import {notFound} from "next/navigation";
import { IInvoice } from "@/utils/types/Invoice";

const Checkout = async ({params}: {params: {invoiceId: string}}) => {
  const session = await getServerSession(authOptions);
  const {token} = session?.user;

  const fetchedInvoice = await fetchInvoice(token.id, params.invoiceId);

  if (!fetchedInvoice) return notFound();

  const {invoice, totalDiscountAmount, totalPrice} = fetchedInvoice;
  const {items, discountCoupon} = (invoice as IInvoice);

  const invoiceItems: IInvoiceItem[] = items.map((invoiceItem) => {
    const {quantity} = invoiceItem;
    const {name, price} = invoiceItem.item;
    return {name, price, quantity};
  })

  return (
    <Container className="w-full flex flex-col flex-1 bg-white">
      <div className="flex flex-col md:flex-row w-full flex-grow gap-x-20 mt-8">
        <div className="w-2/3">
          <CheckoutForm />
        </div>
        <div className="w-1/3 sticky flex-grow top-[10rem] h-full">
          <Invoice
            items={invoiceItems}
            subTotalPrice={totalPrice}
            discountCoupon={discountCoupon}
            discountAmount={totalDiscountAmount}
          />
        </div>
      </div>
    </Container>
  );
};

export default Checkout;
