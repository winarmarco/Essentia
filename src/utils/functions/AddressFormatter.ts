import {CustomerType} from "@/utils/types/Customer";
import { IShippingAddress } from "../types";

const addressFormatter = (shippingAddress: IShippingAddress) => {
  const address = shippingAddress.streetAddress;
  const apartmentNumber = shippingAddress.apartmentNumber;
  const town = shippingAddress.town;
  const zipCode = shippingAddress.zipCode;
  const state = shippingAddress.state;
  const country = shippingAddress.country;

  const apartmentNumberStr = apartmentNumber && `, ${apartmentNumber}`

  return `${address}${apartmentNumberStr}, ${town}, ${zipCode}, ${state}, ${country}`;
};

export {addressFormatter};
