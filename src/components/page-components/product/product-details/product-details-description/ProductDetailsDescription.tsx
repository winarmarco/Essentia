import Button from "@/components/shared/Button";
import CartQuantityButton from "@/components/page-components/cart/shopping-cart-table/CartQuantityButton";
import {findProductIndexInCart} from "@/utils/functions/CheckInCart";
import {addItemToCart, fetchCart, removeItemFromCart} from "@/utils/redux/Cart/CartActions";
import {AppDispatch, RootState} from "@/utils/redux/store";
import { IProduct } from "@/utils/types";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";

const ProductDetailsDescription: React.FC<IProduct> = ({_id, name, category, description, price}) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const cart = useSelector((state: RootState) => state.cart);
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // first when load, we check whether user is authenticated or not
    if (auth.isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, auth]);

  const addToCartHandler = () => {
    // if the user is authenticated
    if (auth.isAuthenticated) {
      // add item to cart
      dispatch(addItemToCart(_id))
    } else {
      // navigate to login
      router.push('/auth/login');
    }
  }

  const productIndex = findProductIndexInCart(cart, _id);
  const addedToCart = productIndex !== -1;

  return (
    <div className="flex flex-col px-5 mt-10 md:pt-20">
      <h2 className="text-3xl font-semibold">{name}</h2>
      <p className="leading-loose pt-2 whitespace-pre-line">
        {description.trim()}
      </p>
      <span className="mt-10">Category : {`$ ${category}`}</span>
      <span className="mt-5">Price : {`$ ${price}`}</span>

      {/* Check has been fetched yet and is not currently loading */}
      {(!cart.isLoading && cart.hasFetched) &&
          // render button, if it is added to cart, then render quantity button
          (addedToCart) ? 
            <CartQuantityButton 
              className="justify-start mt-10" 
              initQuantity={cart.items[productIndex].quantity}
              incrementQtyHandler={() => {dispatch(addItemToCart(_id))}}
              decrementQtyHandler={() => {dispatch(removeItemFromCart(_id))}}
            /> : 
            // else render add to cart button
            <Button className="mt-20"
              filled 
              onClick={addToCartHandler}> Add to cart +</Button>
      }
    </div>
  );
};

export default ProductDetailsDescription;
