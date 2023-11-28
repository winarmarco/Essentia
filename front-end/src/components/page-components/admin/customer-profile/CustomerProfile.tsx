import React from "react";
import CustomerProfileItem from "./CustomerProfileLine";
import {formatDateTime} from "@/utils/functions/DateFormatter";
import {addressFormatter} from "@/utils/functions/AddressFormatter";
import CustomerName from "./CustomerName";
import {IOrder, OrderSchema} from "@/utils/types/order";

const CustomerProfile: React.FC<IOrder> = ({
  firstName,
  lastName,
  shippingAddress,
  email,
  dateOrdered,
  dateCompleted,
  status,
}) => {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="w-1/2 grid grid-cols-2">
        <CustomerName title="First Name" name={firstName} />
        <CustomerName title="Last Name" name={lastName} />
      </div>

      <div className="col-span-2 md:w-1/2 lg:w-3/4 flex flex-col gap-y-3">
        <CustomerProfileItem
          title="Address"
          content={addressFormatter(shippingAddress)}
        />
        <CustomerProfileItem title="Email Address" content={email} />
        <CustomerProfileItem
          title="Date Ordered"
          content={formatDateTime(new Date(dateOrdered))}
        />
        <CustomerProfileItem
          title="Date Completed"
          content={dateCompleted ? formatDateTime(new Date(dateOrdered)) : "-"}
        />
        <CustomerProfileItem
          title="Status"
          content={
            <select
              id="status"
              className="bg-white px-2 py-2 border border-gray-200"
              value={status}
              onChange={() => {
                // TODO: IMPLEMENT CHANGED
                console.log("CHANGED");
              }}
            >
              {OrderSchema.shape.status.options.map((orderStatus) => {
                return (
                  <option key={orderStatus} value={orderStatus}>
                    {orderStatus}
                  </option>
                );
              })}
            </select>
          }
        />
      </div>
    </div>
  );
};

export default CustomerProfile;
