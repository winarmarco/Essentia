import ShoppingCartType from '@/types/ShoppingCart'
import React from 'react'
import CartTableHeader from './CartTableHeader'
import CartTableBody from './CartTableBody'

const CartTable: React.FC<ShoppingCartType> = ({items}) => {
  return (
    <div className="flex flex-col w-full">
      <CartTableHeader />
      <CartTableBody items={items} />
    </div>
  )
}

export default CartTable