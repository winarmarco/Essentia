import React, {HTMLInputTypeAttribute} from "react";
import "../globals.css";
import Navbar from "@/components/common/navbar/Navbar";
import Container from "@/components/common/Container";
import Footer from "@/components/common/footer/Footer";
import Product from "@/types/Product";
import Button from "@/components/common/Button";
import Image from "next/image";

type inputField = {
  id?: string | "";
  label?: string | "";
  type?: HTMLInputTypeAttribute | "text";
  placeholder?: string | "";
  required?: boolean | false;
};

interface shoppingCartItem extends Product {
  quantity: number;
}

const products: shoppingCartItem[] = [
  {
    title: "Product 1",
    price: 100,
    quantity: 2,
    description: "",
    image: ["/image-40.jpg"],
  },
  {
    title: "Cossette",
    price: 50,
    quantity: 1,
    description: "",
    image: ["/image 44.jpg"],
  },
  {
    title: "Aria",
    price: 150,
    quantity: 3,
    description: "",
    image: ["/image 37.jpg"],
  },
  {
    title: "Product 3",
    price: 150,
    quantity: 3,
    description: "",
    image: ["/image 43.jpg"],
  },
  {
    title: "Product 3",
    price: 150,
    quantity: 3,
    description: "",
    image: ["/image 43.jpg"],
  },
  {
    title: "Product 3",
    price: 150,
    quantity: 3,
    description: "",
    image: ["/image 43.jpg"],
  },
];

const CheckoutFormInputField: React.FC<inputField> = (props) => {
  return (
    <div className={`flex flex-col`}>
      {props.label && (
        <label className="font-semibold" htmlFor={props.id}>
          {props.label}
          {props.required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <input
        placeholder={props.placeholder}
        type={props.type}
        className="p-2 px-5 border border-black placeholder-gray-500"
      />
    </div>
  );
};

const ShippingDetails = () => {
  return (
    <form className="flex flex-col gap-y-5">
      <div className="grid grid-cols-2 gap-x-10">
        <CheckoutFormInputField id="first-name" label="First name" required />
        <CheckoutFormInputField id="last-name" label="Last name" required />
      </div>

      <CheckoutFormInputField id="country" label="Country / Region" required />
      <CheckoutFormInputField
        id="address"
        label="Street address"
        placeholder="House number and street name"
        required
      />
      <CheckoutFormInputField
        id="apartment-number"
        placeholder="Apartment, suite, unit, etc. (optional)"
      />

      <CheckoutFormInputField id="town" label="Town / City" required />
      <CheckoutFormInputField id="apartment-number" label="State" required />

      <CheckoutFormInputField id="zip-code" label="ZIP Code" required />

      <CheckoutFormInputField
        id="email-address"
        label="Email address"
        required
      />
    </form>
  );
};

const PaymentMethod = () => {
  return (
    <div className="flex flex-col gap-y-5">
      <CheckoutFormInputField
        id="card-number"
        label="Card Number"
        placeholder="**** **** **** ****"
        required
      />

      <div className="grid grid-cols-2 gap-x-5">
        <CheckoutFormInputField
          id="card-expiry"
          label="Expiration (MM/YY)"
          placeholder="MM / YY"
          required
        />
        <CheckoutFormInputField
          id="card-csc"
          label="Card Security Code"
          placeholder="CSC"
          required
        />
      </div>
    </div>
  );
};

const Checkout = () => {
  const totalCost = (products: shoppingCartItem[]) => {
    let sum = 0;
    for (let i = 0; i < products.length; i++) {
      sum += products[i].price * products[i].quantity;
    }
    return sum;
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <div className="sticky top-0 z-30 bg-white">
        <Navbar />
      </div>
      <Container className="w-full flex flex-col flex-1 bg-white">
        <div className="flex flex-col lg:flex-row w-full flex-grow gap-x-20 bg-white">
          <div className="w-full">
            <div className="w-full flex flex-col gap-y-4 sticky z-20 top-0 pt-[6rem] bg-white pb-4">
              <span>
                {"< Edit Cart"}
              </span>
              <span className="text-4xl font-semibold bg-white w-full">
                Shipping details
              </span>
            </div>
            <ShippingDetails />

            <div className="w-full flex flex-col gap-y-4 sticky z-20 top-0 pt-[6rem] bg-white pb-4">
              <span className="text-4xl font-semibold bg-white w-full">
                Payment Method
              </span>
              <span>Credit card</span>
            </div>
            <PaymentMethod />
          </div>
          <div className="w-full md:w-1/2 sticky flex-grow top-0 pt-20 h-full">
            <div className="flex flex-col p-5 mt-10 pt-16 border border-gray-200">
              <h2 className="text-3xl font-semibold">TOTAL</h2>
              <div className="border-b border-gray-200 pb-5 mt-5">
                {products.map((product, index) => {
                  return (
                    <div key={index} className="grid grid-cols-3">
                      <div className="flex gap-x-2 col-span-2">
                        <span className="font-medium">{product.title}</span>
                        <span>x {product.quantity}</span>
                      </div>
                      <div className="text-left font-medium">
                        $ {product.price * product.quantity}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pb-4 border-b border-gray-200">
                <div className="grid grid-cols-3">
                  <div className="col-span-2">Subtotal</div>
                  <div className="col-span-1 font-medium">
                    $ {totalCost(products)}
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="col-span-2">Discount</div>
                  <div className="col-span-1 font-medium">-10%</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="grid grid-cols-3">
                  <div className="col-span-2">TOTAL</div>
                  <div className="col-span-1 font-medium">
                    $ {totalCost(products) * 0.9}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button className="w-full mb-40 mt-20 py-3" filled>
          PLACE ORDER
        </Button>
      </Container>
      <Footer />
    </div>
  );
};

export default Checkout;
