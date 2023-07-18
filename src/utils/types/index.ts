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
  category: IProductCategory | IProductCategory["_id"];
  newProduct: boolean;
  description: string;
  shortDescription: string;
  images: string[];
}

export interface IShoppingCart {
  items: {
    item: IProduct["_id"] | IProduct;
    quantity: number;
  }[];
}

export enum DiscountCodeStatus {
  ACTIVE = "Active",
  EXPIRED = "Expired",
}

export interface IDiscountCode {
  discountCode: String | undefined;
  validStart: Date | undefined;
  validEnd: Date | undefined;
  discountAmount: Number | undefined;
  percentAmount: Boolean | undefined;
  maxDiscountDollar: Number | undefined;
  status: DiscountCodeStatus | undefined;
}

export type IDiscountCodeClient = Pick<IDiscountCode, 'discountCode' | 'percentAmount' | 'discountAmount' | 'maxDiscountDollar'>;

export interface IInvoice extends Document {
  cart: IShoppingCart;
  discountCode: IDiscountCode;
}

export enum OrderStatus {
  PENDING = "Pending",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}

export interface IShippingAddress {
  streetAddress: string;
  apartmentNumber: string;
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
