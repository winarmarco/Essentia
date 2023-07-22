interface Document {
  _id: string;
}

export interface IProductCategory extends Document {
  _id: string;
  name: string;
  categoryKey: string;
}

export interface IProduct extends Document {
  _id: string;
  name: string;
  price: number;
  stockQuantity: number;
  showOnLandingCarousel: boolean;
  category: IProductCategory;
  newProduct: boolean;
  description: string;
  shortDescription: string;
  images: string[];
}

export interface IShoppingCartItem {
  item: IProduct;
  quantity: number;
}

export interface IShoppingCart {
  items: IShoppingCartItem[];
}

export enum DiscountCouponStatus {
  ACTIVE = "Active",
  EXPIRED = "Expired",
}

export interface IDiscountCoupon {
  discountCode: String | undefined;
  validStart: Date | undefined;
  validEnd: Date | undefined;
  discountAmount: Number | undefined;
  percentAmount: Boolean | undefined;
  maxDiscountDollar: Number | undefined;
  status: DiscountCouponStatus | undefined;
}

export type IDiscountCouponClient = Pick<IDiscountCoupon, 'discountCode' | 'percentAmount' | 'discountAmount' | 'maxDiscountDollar'>;

export interface IInvoice extends Document {
  cart: IShoppingCart;
  discountCode: IDiscountCoupon;
}

export interface IInvoiceClient {
  cart: IShoppingCart;
  discountCode: IDiscountCouponClient;
}

export enum OrderStatus {
  PENDING = "Pending",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}

export interface IShippingAddress {
  country: string;
  streetAddress: string;
  apartmentNumber: string;
  state: string;
  town?: string;
  zipCode: string;
}

export interface IOrder {
  shippingAddress: IShippingAddress;
  invoice: IInvoice;
  dateOrdered: Date;
  dateCompleted: Date;
  status: OrderStatus;
}

export enum UserRole {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
}

export interface IUser {
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: IShippingAddress;
  password: string;
  cart: IShoppingCart;
  history: IOrder[];
}

export interface ISignUpUser {
  firstName: IUser["firstName"],
  lastName: IUser["lastName"],
  phoneNumber: IUser["phoneNumber"],
  email: IUser["email"],
  password: IUser["password"],
  confirmPassword: IUser["password"],
}

export interface ISignInUser{
  email: IUser["email"],
  password: IUser["password"],
}