import React from "react";
import Link from "next/link";
import {notFound} from "next/navigation";
import {getServerSession} from "next-auth";

// Utils and actions
import {fetchCart} from "@/utils/actions/cart-action";
import {fetchProductDetails} from "@/utils/actions/products-action";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

// Component imports
import "../../globals.css";
import Header from "@/components/shared/header/Header";
import Navbar from "@/components/shared/navbar/Navbar";
import Container from "@/components/shared/Container";
import Main from "@/components/shared/main/Main";
import ProductDisplay from "@/components/page-components/product/product-details/product-display/ProductDisplay";
import Footer from "@/components/shared/footer/Footer";
import {ICart} from "@/utils/types/cart";

// ProductDetails async component
const ProductDetails = async ({params}: {params: {productId: string}}) => {
  const {productId} = params;
  const productDetails = await fetchProductDetails(productId);

  if (!productDetails) {
    return notFound();
  }

  const session = await getServerSession(authOptions);
  let quantityInCart = 0;

  if (session?.user?.token.id) {
    const cartDetails = await fetchCart(session.user.token.id);

    if (!cartDetails) {
      return notFound();
    }

    const cartItem = (cartDetails.cart as ICart).items.find(
      (item) => item.item._id === productId
    );
    quantityInCart = cartItem ? cartItem.quantity : 0;
  }

  return (
    <ProductDisplay
      product={productDetails.product}
      quantity={quantityInCart}
    />
  );
};

export default ProductDetails;
