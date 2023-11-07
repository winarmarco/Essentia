import CartQuantityButton from "@/components/page-components/cart/shopping-cart-table/CartQuantityButton";
import React from "react";
import {IProduct} from "@/utils/types/products";
import {cookies} from "next/dist/client/components/headers";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {getServerSession} from "next-auth";
import {addToCart, fetchCart, removeFromCart} from "@/utils/actions/cart-action";
import {CartSchema} from "@/utils/types/cart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProductDetailsDescription: React.FC<{product: IProduct, quantity: number}> = ({product, quantity}) => {
  const {_id: productId, name, description, price} = product;
  const {data: session} = useSession();
  const router = useRouter();

  // if (!authenticated) {
  //   return redirect("/login");
  // }
  // const cart = await fetchCart();

  // console.log(cart);

  // const dispatch = useDispatch<AppDispatch>();
  // const cart = useSelector((state: RootState) => state.cart);
  // const auth = useSelector((state: RootState) => state.auth);

  // useEffect(() => {
  //   // first when load, we check whether user is authenticated or not
  //   if (auth.isAuthenticated) {
  //     dispatch(fetchCart());
  //   }
  // }, [dispatch, auth]);

  // const addToCartHandler = () => {
  //   // if the user is authenticated
  //   if (auth.isAuthenticated) {
  //     // add item to cart
  //     dispatch(addItemToCart(_id))
  //   } else {
  //     // navigate to login
  //     router.push('/auth/login');
  //   }
  // }

  const addToCartHandler = async () => {
    if (session && session.user.token && session.user.token.id) {
      const {token} = session.user;
      const res = await addToCart(token.id, productId);
      
    } else {
      router.push("/auth/signin");
    }
  };

  const removeFromCartHandler = async () => {
    if (session && session.user.token && session.user.token.id) {
      const {token} = session.user;
      const res = await removeFromCart(token.id, productId);

    } else {
      // navigate to /auth/login
      router.push("/auth/signin");
    }
  };

  // const productIndex = findProductIndexInCart(cart, _id);
  // const addedToCart = productIndex !== -1;

  return (
    <div className="flex flex-col px-5 mt-10 md:pt-20">
      <h2 className="text-3xl font-semibold">{name}</h2>
      <p className="leading-loose pt-2 whitespace-pre-line">
        {description.trim()}
      </p>
      <span className="mt-10">Category : {``}</span>
      <span className="mt-5">Price : {`$ ${price}`}</span>
      <CartQuantityButton
        className="justify-start mt-10"
        initQuantity={quantity}
        incrementQtyHandler={addToCartHandler}
        decrementQtyHandler={removeFromCartHandler}
      />
    </div>
  );
};

export default ProductDetailsDescription;
