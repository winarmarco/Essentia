import Invoice from "@/components/page-components/cart/invoice/Invoice";
import CartTable from "@/components/page-components/cart/shopping-cart-table/CartTable";
import {Order, OrderStatus} from "@/utils/types/Order";
import CustomerProfile from "../customer-profile/CustomerProfile";

const OrderDetails: React.FC<{order: Order}> = ({order}) => {
  return (
    <div className="w-full h-full flex flex-col gap-y-10 max-w-[2048px]">
      <span className="cursor-pointer">
        {"< All Orders"}
      </span>
      <div className="text-3xl font-bold">{`Order #${order.orderID}`}</div>
      <div className="flex flex-col gap-y-20">
        <CustomerProfile {...order} />

        <Invoice invoice={order.invoice} />

        <CartTable {...order.invoice.cart} />
      </div>
    </div>
  );
};

export default OrderDetails;
