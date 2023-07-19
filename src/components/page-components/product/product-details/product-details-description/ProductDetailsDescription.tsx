import Button from "@/components/common/Button";
import CartQuantityButton from "@/components/page-components/cart/shopping-cart-table/CartQuantityButton";
import {findProductIndexInCart} from "@/utils/functions/CheckInCart";
import {addItemToCart, fetchCart, removeItemFromCart} from "@/utils/redux/Cart/CartActions";
import {AppDispatch, RootState} from "@/utils/redux/store";
import { IProduct } from "@/utils/types";
import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { addToCart } from "../../../../../../server/controller/Cart";

const ProductDetailsDescription: React.FC<IProduct> = ({
  _id,
  name,
  category,
  description,
  price,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);
  const productIndex = findProductIndexInCart(cart, _id);
  const addedToCart = (productIndex !== -1);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  console.log(addedToCart, cart, productIndex, cart.isLoading);

  const incrementProductButton =  (!addedToCart ? 
    <Button className="mt-20"filled onClick={() => {dispatch(addItemToCart(_id));}}> Add to cart +</Button> : 
    <CartQuantityButton 
      className="justify-start mt-10" 
      initQuantity={cart.items[productIndex].quantity}
      incrementQtyHandler={() => {dispatch(addItemToCart(_id))}}
      decrementQtyHandler={() => {dispatch(removeItemFromCart(_id))}}
    />
  )

  return (
    <div className="flex flex-col px-5 mt-10 md:pt-20">
      <h2 className="text-3xl font-semibold">{name}</h2>
      <p className="leading-loose pt-2 whitespace-pre-line">
        {description.trim()}
      </p>
      <span className="mt-10">Category : {`$ ${category}`}</span>
      <span className="mt-5">Price : {`$ ${price}`}</span>

      {!cart.isLoading && incrementProductButton}
    </div>
  );
};

export default ProductDetailsDescription;
