import ShoppingCartType from '@/types/ShoppingCart'
import React from 'react'
import CartTableLine from './CartTableLine'

const CartTableBody: React.FC<ShoppingCartType> = ({items}) => {
  return (
    <div className="flex flex-col divide-y">
      {items.map((item, index) => 
        <CartTableLine {...item} key={index}/>
      )}
    </div>
  )
}

export default CartTableBody