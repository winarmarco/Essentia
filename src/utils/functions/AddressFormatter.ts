import {CustomerType} from "@/utils/types/Customer";

const addressFormatter = (customer: CustomerType) => {
  const address = customer.address;
  const apartmentNumber = customer["apartment-number"];
  const town = customer.town;
  const zipCode = customer["zip-code"];
  const state = customer.state;
  const country = customer.country;

  const apartmentNumberStr = apartmentNumber && `, ${apartmentNumber}`

  return `${address}${apartmentNumberStr}, ${town}, ${zipCode}, ${state}, ${country}`;
};

export {addressFormatter};
