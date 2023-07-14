import { Document, Schema, model } from "mongoose";
import { ICart } from "./Cart";
import { IInvoice } from "./Invoice";

enum UserRole {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
}

interface UserAddressType {
  streetAddress: string,
  apartmentNumber: string,
  town: string,
  zipCode: string,
}

interface IUser extends Document {
  role: UserRole,
  firstName: string,
  lastName: string,
  email: string,
  address: UserAddressType,
  password: string,
  cart: ICart["_id"],
  history: IInvoice["_id"][];
}

const UserSchema: Schema<IUser> = new Schema({
  role: {
    type: String,
    enum: Object.values(UserRole),
  },
  firstName: {
    type : String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: {
      streetAddress: {
        type: String,
        required: true,
      },
      apartmentNumber: {
        type: String,
      },
      town: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
  },
  history: [{
    type: Schema.Types.ObjectId,
    ref: 'Invoice',
  }]
})

const User = model<IUser>("User", UserSchema);

export default User;
export type {IUser};