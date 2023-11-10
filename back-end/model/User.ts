import {Document, Error, HydratedDocument, Model, PopulatedDoc, Schema, model} from "mongoose";
import Cart, {ICart} from "./Cart";
import {IInvoice} from "./Invoice";
import {compare, genSalt, hash} from "bcryptjs";
import ShippingAddress, { IShippingAddress } from "./ShippingAddress";
import { IOrder } from "./Order";

export enum UserRole {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
}

interface IUser extends Document {
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: PopulatedDoc<IShippingAddress & Document>;
  password: string;
  confirmPassword: string;
  cart: PopulatedDoc<ICart & Document>;
  history: PopulatedDoc<IOrder & Document>;
}

interface IUserMethods {}

interface UserModel extends Model<IUser, {}, IUserMethods> {
  signIn(
    email: string,
    password: string
  ): Promise<HydratedDocument<IUser, IUserMethods>>;
}

const UserSchema: Schema<IUser, UserModel, IUserMethods> = new Schema({
  role: {
    type: String,
    enum: {values: Object.values(UserRole), message: '{VALUE} is not supported'},
    default: UserRole.CUSTOMER,
  },
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: function(v: string) {
        const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return EMAIL_REGEX.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    },
    unique: true,
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: "ShippingAddress",
    required: false,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function(v: string) {
        const PHONE_NUMBER_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return PHONE_NUMBER_REGEX.test(v);
      },
      message: props => `${props.value} is not a valid phone number`,
    },
    required: [true, "Phone number is required"],
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
    default: null,
  },
  history: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});


// Authenticate user
UserSchema.static("signIn", async function signIn(email: string, password: string) {
  try {
    // First find user with given email
    const user = await User.findOne({email});

    if (!user) {
      throw new Error('User not found');
    }
    
    // Compare with the encrypted password
    const match = await compare(password, user.password);

    if (!match) {
      throw new Error("No user with that credentials");
    }

    return user;
  } catch (err) {
    throw err;
  }
});


// Hash Password before saving to the database
UserSchema.pre("save", async function (next) {
  try {
    const user = this;

    // hash password
    if (!user.isModified("password")) return next();

    const salt = await genSalt(10);
    const hashedPassword = await hash(user.password, salt);
    user.password = hashedPassword;
    
    // Create ne wcart for user
    if (!user.cart) {
      const newCart = new Cart();
      const cart = await newCart.save();
      user.cart = cart._id;
    }

    next();
  } catch (err) {
    throw err;
  }
});

const User = model<IUser, UserModel>("User", UserSchema);

export default User;
export type {IUser};
