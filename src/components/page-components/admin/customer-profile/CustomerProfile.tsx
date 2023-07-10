import React from "react";
import Image from "next/image";
import CustomerProfileItem from "./CustomerProfileLine";
import {Order} from "@/types/Order";
import {formatDate} from "@/utils/functions/DateFormatter";
import {addressFormatter} from "@/utils/functions/AddressFormatter";
import CustomerName from "./CustomerName";

const CustomerProfile: React.FC<Order> = ({
  customer,
  DateCompleted,
  DateOrdered,
}) => {
  console.log(DateOrdered);
  return (
    <div className="flex flex-col gap-y-10">
      <div className="w-1/2 grid grid-cols-2">
        <CustomerName title="First Name" name={customer["first-name"]} />
        <CustomerName title="Last Name" name={customer["last-name"]} />
      </div>

      <div className="col-span-2 md:w-1/2 lg:w-3/4 flex flex-col gap-y-3">
        <CustomerProfileItem
          title="Address"
          content={addressFormatter(customer)}
        />
        <CustomerProfileItem
          title="Email Address"
          content={customer["email-address"]}
        />
        <CustomerProfileItem
          title="Date Ordered"
          content={formatDate(DateOrdered)}
        />
        <CustomerProfileItem
          title="Date Completed"
          content={DateCompleted ? formatDate(DateOrdered) : "-"}
        />
        <CustomerProfileItem
          title="Status"
          content={
            <select
              id="countries"
              className="bg-white px-2 py-2 border border-gray-200"
            >
              <option selected>Pending</option>
              <option value="US">Completed</option>
              <option value="CA">Cancelled</option>
            </select>
          }
        />
      </div>
    </div>
  );
};

export default CustomerProfile;
