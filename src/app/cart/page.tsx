import React, {useState} from "react";
import "../globals.css";
import Navbar from "@/components/common/navbar/Navbar";
import Container from "@/components/common/Container";
import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/Header";
import Main from "@/components/common/main/Main";
import ShoppingCart from "@/types/ShoppingCart";
import Invoice from "@/components/page-components/cart/invoice/Invoice";
import CartTable from "@/components/page-components/cart/shopping-cart-table/CartTable";
import InvoiceType from "@/types/Invoice";
import { invoiceDummyData } from "@/utils/dummy-data/Invoice";

const Cart: React.FC<{invoice: InvoiceType}> = ({invoice}) => {

  invoice = invoiceDummyData;

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <Header className="sticky top-0 z-30 bg-white">
        <Navbar />
      </Header>
      <Main className="flex-grow">
        <Container className="w-full flex flex-col bg-white">
          <div className="flex flex-col md:flex-row w-full flex-grow gap-x-20">
            <div className="w-2/3">
              <CartTable items={invoice.cart.items} />
            </div>
            <div className="w-1/3 sticky flex-grow top-[10rem] h-full">
              <Invoice invoice={invoice} />
            </div>
          </div>
        </Container>
      </Main>
      <Footer />
    </div>
  );
};

export default Cart;
