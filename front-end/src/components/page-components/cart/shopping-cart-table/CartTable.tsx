import React from 'react'
import CartTableHeader from './CartTableHeader'
import CartTableBody from './CartTableBody'
import { ICart } from '@/utils/types/cart'

const CartTable: React.FC<{items: ICart["items"]}> = ({items}) => {
  return (
    <div className="flex flex-col w-full">
      <CartTableHeader />
      {(items.length > 0) ? <CartTableBody items={items} /> : <p>There are no items in your cart.</p>}
    </div>
  )
}

export default CartTable