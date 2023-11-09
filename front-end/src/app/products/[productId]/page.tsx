import "../../globals.css";
import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import Container from "@/components/shared/Container";
import React, {useEffect, useState} from "react";

import Header from "@/components/shared/header/Header";
import Main from "@/components/shared/main/Main";
import { fetchProductDetails } from "@/utils/actions/products-action";
import Link from "next/link";
import ProductDisplay from "@/components/page-components/product/product-details/product-display/ProductDisplay";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchCart } from "@/utils/actions/cart-action";
import { CartSchema } from "@/utils/types/cart";

const ProductDetails = async ({params} : {params: {productId: string}}) => {

  const {productId} = params;
  const fetchedProduct = await fetchProductDetails(productId);
  const { product } = fetchedProduct;

  const session = await getServerSession(authOptions);
  let quantity = 0;
  if (session) {
    const {token} = session.user;
    const fetchedCart = await fetchCart(token.id);

    const cart = CartSchema.parse(fetchedCart.cart);

    const cartItemAdded = cart.items.filter((cartItem) => {
      const {item, quantity} = cartItem;
      return item._id == productId;
    });

    quantity = cartItemAdded.length > 0 ? cartItemAdded[0].quantity : 0;
  }

  

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <Header className="sticky top-0 z-30 bg-white">
        <Navbar />
      </Header>

      <Main className="flex-grow">
        <Container className="w-full flex flex-col pt-10">
          <Link href={"/products"}>{"< All Products"}</Link>
          <ProductDisplay product={product} quantity={quantity}/>
        </Container>
      </Main>
      <Footer />
    </div>
  );
};

export default ProductDetails;
