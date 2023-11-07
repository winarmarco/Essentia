import React from 'react'
import CartTableHeader from './CartTableHeader'
import CartTableBody from './CartTableBody'
import { IShoppingCart } from '@/utils2/types'

const CartTable: React.FC<{items: IShoppingCart["items"]}> = ({items}) => {
  return (
    <div className="flex flex-col w-full">
      <CartTableHeader />
      <CartTableBody items={items} />
    </div>
  )
}

export default CartTable