import { Document, Schema, model } from "mongoose";

interface IShippingAddress extends Document {
  streetAddress: string;
  apartmentNumber: string;
  town: string;
  zipCode: string;
}


const ShippingAddressShema: Schema<IShippingAddress> = new Schema({
  streetAddress: {
    type: String,
    required: true,
  },
  apartmentNumber: {
    type: String,
    default: '',
  },
  town: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
})


const ShippingAddress = model<IShippingAddress>("ShippingAddress", ShippingAddressShema);

export default ShippingAddress;
export type {IShippingAddress};