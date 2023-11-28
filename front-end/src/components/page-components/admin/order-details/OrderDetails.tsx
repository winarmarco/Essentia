import Invoice, {
  IInvoiceItem,
} from "@/components/page-components/cart/invoice/Invoice";
import CustomerProfile from "../customer-profile/CustomerProfile";
import Link from "next/link";
import {IFetchedOrder} from "@/utils/functions/extractStatistics";

const OrderDetails: React.FC<{order: IFetchedOrder}> = ({order}) => {
  const invoiceItems: IInvoiceItem[] = order.invoice.items.map(
    (invoiceItem) => {
      const {quantity} = invoiceItem;
      const {name, price} = invoiceItem.item;
      return {name, price, quantity};
    }
  );

  return (
    <div className="w-full h-full flex flex-col gap-y-10 max-w-[2048px]">
      <Link href={"/admin/orders"}>{"< All Orders"}</Link>
      <div className="text-3xl font-bold">{`Order #${order._id}`}</div>
      <div className="flex flex-col gap-y-20">
        <CustomerProfile {...order} />

        <Invoice
          items={invoiceItems}
          discountCoupon={order.invoice.discountCoupon}
          subTotalPrice={order.subTotal}
          discountAmount={order.discountDollarAmount}
          isAdmin
        />
        {/* <CartTable {...order.invoice.cart} /> */}
      </div>
    </div>
  );
};

export default OrderDetails;
