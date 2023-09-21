import { Document, Schema, model } from "mongoose";

interface IShippingAddress extends Document {
  country: string;
  streetAddress: string;
  apartmentNumber: string;
  town: string;
  state: string;
  zipCode: string;
}


const ShippingAddressShema: Schema<IShippingAddress> = new Schema({
  country: {
    type: String,
    required: true,
  },
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
  state: {
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