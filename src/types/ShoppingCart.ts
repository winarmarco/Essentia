import Product from "./Product"

type ShoppingCartItemType = {
  product: Product,
  quantity: number,
}


type ShoppingCartType = {
  items: ShoppingCartItemType[],
}

export default ShoppingCartType;
export type {ShoppingCartItemType}