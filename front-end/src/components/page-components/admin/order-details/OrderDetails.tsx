import Invoice from "@/components/page-components/cart/invoice/Invoice";
import CartTable from "@/components/page-components/cart/shopping-cart-table/CartTable";
import {Order, OrderStatus} from "@/utils2/types/Order";
import CustomerProfile from "../customer-profile/CustomerProfile";
import {IOrder} from "@/utils2/types";
import Link from "next/link";

const OrderDetails: React.FC<{order: IOrder}> = ({order}) => {

  return (
    <div className="w-full h-full flex flex-col gap-y-10 max-w-[2048px]">
      <Link href={"/admin/orders"}>{"< All Orders"}</Link>
      <div className="text-3xl font-bold">{`Order #${order._id}`}</div>
      <div className="flex flex-col gap-y-20">
        <CustomerProfile {...order} />

        <Invoice
          cart={order.invoice.cart}
          discountCoupon={order.invoice.discountCoupon}
        />

        <CartTable {...order.invoice.cart} />
      </div>
    </div>
  );
};

export default OrderDetails;
