import React, {useState} from "react";
import "../globals.css";
import Navbar from "@/components/common/navbar/Navbar";
import Container from "@/components/common/Container";
import Footer from "@/components/common/footer/Footer";
import Button from "@/components/common/Button";
import Product from "@/types/Product";
import Image from "next/image";
import Header from "@/components/common/header/Header";
import Main from "@/components/common/main/Main";
import ShoppingCart from "@/types/ShoppingCart";
import Invoice from "@/components/page-components/cart/invoice/Invoice";
import {productData} from "@/dummyProductData";
import DiscountType from "@/types/DiscountType";
import CartTable from "@/components/page-components/cart/shopping-cart-table/CartTable";
import InvoiceType from "@/types/Invoice";

const Cart: React.FC<ShoppingCart> = ({items}) => {
  items = [
    {
      product: productData[0],
      quantity: 1,
    },
    {
      product: productData[1],
      quantity: 3,
    },
    {
      product: productData[1],
      quantity: 3,
    },
    {
      product: productData[1],
      quantity: 3,
    },
    {
      product: productData[1],
      quantity: 3,
    },
    {
      product: productData[1],
      quantity: 3,
    },
  ];

  const cart: ShoppingCart = {
    items: items,
  };

  const discount: DiscountType = {
    discountCode: "July Fest",
    amount: 10,
    percent: true,
  };

  const invoice: InvoiceType = {
    cart: cart,
    discount: discount,
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <Header className="sticky top-0 z-30 bg-white">
        <Navbar />
      </Header>
      <Main className="flex-grow">
        <Container className="w-full flex flex-col bg-white">
          <div className="flex flex-col md:flex-row w-full flex-grow gap-x-20">
            <div className="w-2/3">
              <CartTable items={items} />
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
