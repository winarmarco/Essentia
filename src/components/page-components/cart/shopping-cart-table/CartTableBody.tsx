import ShoppingCartType from '@/utils/types/ShoppingCart'
import React from 'react'
import CartTableLine from './CartTableLine'
import { IShoppingCart } from '@/utils/types'

const CartTableBody: React.FC<{items: IShoppingCart["items"]}> = ({items}) => {
  return (
    <div className="flex flex-col divide-y">
      {items.map((item, index) => 
        <CartTableLine {...item} key={index}/>
      )}
    </div>
  )
}

export default CartTableBody