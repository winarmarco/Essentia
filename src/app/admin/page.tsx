"use client";

import React, { useMemo } from "react";
import "../globals.css";
import {AiFillEdit} from "react-icons/ai";
import {CategoryScale, TimeScale} from "chart.js";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";
import {ColumnDef} from "@tanstack/react-table";
import DataTable from "@/components/common/DataTable/DataTable";
import {LiaTimesSolid} from "react-icons/lia";
import Image from "next/image";
import Button from "@/components/common/Button";
import Product from "@/types/Product";
import {productData} from "@/dummyProductData";
import Sidebar from "@/components/page-components/admin/sidebar/Sidebar";
import StatisticAdmin from "@/components/page-components/admin/Statistic/Statistic";

Chart.register(CategoryScale, TimeScale);
type StatsBoxData = {
  title: string;
  content: React.ReactNode;
  className?: string | "";
  titleClass?: string | "";
  contentClass?: string | "";
};




interface Order {
  orderID: string;
  firstName: string;
  lastName: string;
  total: number;
  status: string;
}


const Order = () => {
  const columns = useMemo<ColumnDef<Order>[]>(
    () => [
      {
        header: "Order ID",
        cell: (row) => row.renderValue(),
        accessorKey: "orderID",
      },
      {
        header: "First Name",
        cell: (row) => row.renderValue(),
        accessorKey: "firstName",
      },
      {
        header: "Last Name",
        cell: (row) => row.renderValue(),
        accessorKey: "lastName",
      },
      {
        header: "Total",
        cell: (row) => row.renderValue(),
        accessorKey: "total",
      },
      {
        header: "Status",
        cell: (row) => row.renderValue(),
        accessorKey: "status",
      },
    ],
    []
  );

  const data: Order[] = [
    {
      orderID: "1",
      firstName: "John",
      lastName: "Doe",
      total: 150,
      status: "Completed",
    },
    {
      orderID: "2",
      firstName: "John",
      lastName: "Doe",
      total: 150,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 300,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 200,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 800,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 1000,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 100,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 250,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 800,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 1000,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 100,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 250,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 800,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 1000,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 100,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 250,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 800,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 1000,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 100,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 250,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 800,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 1000,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "John",
      lastName: "Doe",
      total: 100,
      status: "Completed",
    },
    {
      orderID: "123",
      firstName: "Ami",
      lastName: "Doe",
      total: 250,
      status: "Completed",
    },
  ];

  return (
    <div className="flex flex-col w-full h-full gap-y-10">
      <h1 className="text-3xl font-bold">Order List</h1>
      <DataTable data={data} columns={columns} initPageSize={20} />
    </div>
  );
};

const OrderDetails = () => {
  const products = [
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

  const totalCost = (
    products: {
      title: string;
      price: number;
      quantity: number;
      description: string;
      image: string[];
    }[]
  ) => {
    let sum = 0;
    for (let i = 0; i < products.length; i++) {
      sum += products[i].price * products[i].quantity;
    }
    return sum;
  };

  return (
    <div className="w-full h-full flex flex-col gap-y-10 max-w-[2048px]">
      <div className="underline underline-offset-4 cursor-pointer">
        {"< All Orders"}
      </div>
      <div className="text-3xl font-bold">Order #1023</div>
      <div className="w-1/2 grid grid-cols-2">
        <div>
          <span>First Name</span>
          <h1 className="text-2xl font-semibold">John</h1>
        </div>
        <div>
          <span>Last Name</span>
          <h1 className="text-2xl font-semibold">Doe</h1>
        </div>
      </div>

      <div className="col-span-2 w-3/4 flex flex-col gap-y-3">
        <div className="grid grid-cols-2 items-center">
          <span className="font-medium">Date Ordered</span>
          <span>16 June 2023 04:23pm</span>
        </div>
        <div className="grid grid-cols-2 items-center">
          <span className="font-medium">Date Completed</span>
          <span>-</span>
        </div>
        <div className="grid grid-cols-2 items-center">
          <span className="font-medium">Status</span>
          <span>
            <select
              id="countries"
              className="bg-white px-2 py-2 border border-gray-200"
            >
              <option selected>Pending</option>
              <option value="US">Completed</option>
              <option value="CA">Cancelled</option>
            </select>
          </span>
        </div>
      </div>

      <div className="gap-y-5 flex flex-col">
        <div className="w-full md:w-1/2 h-full">
          <div className="flex flex-col p-5 mt-10 pt-10 border border-gray-200">
            <h2 className="text-3xl font-semibold">Invoice</h2>
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
                <div className="col-span-2 font-bold">Subtotal</div>
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
              <div className="grid grid-cols-3 font-bold">
                <div className="col-span-2">TOTAL</div>
                <div className="col-span-1 font-medium">
                  $ {totalCost(products) * 0.9}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="gap-y-5 flex flex-col mt-20">
        <span className="text-2xl font-semibold">Order</span>
        <div className="w-full">
          <div className="w-full  pb-5">
            <div className="grid grid-cols-4 text-center font-semibold pl-5 py-5 border-b border-gray-200">
              <div className="w-full text-left col-span-2">Product</div>
              <div>Price</div>
              <div>Quantity</div>
            </div>
          </div>
          {products.map((product, index) => (
            <div
              className={`grid grid-cols-4 text-center ${
                index < products.length - 1 && "border-b border-gray-200"
              }`}
              key={index}
            >
              <div className="flex items-center justify-center my-5 col-span-2">
                <div className="min-w-[100px] md:w-[200px] bg-red-50 relative aspect-square">
                  <Image
                    src={product.image[0]}
                    alt="image"
                    className="object-cover absolute inset-0"
                    fill
                    sizes="100vw"
                  />
                </div>

                <div className="flex-1 ml-5 md:ml-10 text-left flex flex-col">
                  <span className="flex-1 text-left">{product.title}</span>
                  <span className="text-sm text-gray-400">{"Table"}</span>
                </div>
              </div>
              <div className="text-right flex items-center justify-center mr-5">
                $ {product.price}
              </div>
              <div className="flex items-center justify-center ">
                <div className="w-[100px] grid grid-cols-3">
                  <button className="border border-r-0 border-black">-</button>
                  <span className="border border-black">
                    {product.quantity}
                  </span>
                  <button className="border border-l-0 border-black">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Settings = () => {};

const Products = () => {
  const columns = useMemo<
    ColumnDef<{
      image: React.JSX.Element;
      product: string;
      price: string;
      quantity: number;
      category: string;
      action: React.JSX.Element;
    }>[]
  >(
    () => [
      {
        header: "Image",
        cell: (row) => row.renderValue(),
        accessorKey: "image",
      },
      {
        header: "Product",
        cell: (row) => row.renderValue(),
        accessorKey: "product",
      },
      {
        header: "Category",
        cell: (row) => row.renderValue(),
        accessorKey: "category",
      },
      {
        header: "Price",
        cell: (row) => row.renderValue(),
        accessorKey: "price",
      },
      {
        header: "Quantity",
        cell: (row) => row.renderValue(),
        accessorKey: "quantity",
      },
      {
        header: "Action",
        cell: (row) => row.renderValue(),
        accessorKey: "action",
      },
    ],
    []
  );

  const data = productData.map((product) => {
    return {
      image: (
        <div className="w-[50px] h-[50px] bg-red-50 relative">
          <Image src={product.images[0]} alt={product.name} fill />
        </div>
      ),
      product: product.name,
      price: `$ ${product.price}`,
      quantity: 10,
      category: "Sofa",
      action: (
        <div>
          <div>
            <AiFillEdit />
          </div>
        </div>
      ),
    };
  });

  return (
    <div className="flex flex-col gap-y-10 w-full h-full">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold">Product List</h1>
        <Button filled>+ Add Product</Button>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};

const ProductInput: React.FC<{
  title: string;
  type?: React.HTMLInputTypeAttribute | "textarea";
  required?: boolean | false;
  className?: string;
}> = ({className, title, required, type = "text"}) => {
  return (
    <div className={className}>
      {(type === "text" || type === "number") && (
        <>
          <label>
            <span>{title}</span>
            {required && <span className="text-red-400 pl-1">*</span>}
          </label>
          <input type={type} className="px-2 py-1 border border-gray-600" />
        </>
      )}
      {type === "checkbox" && (
        <>
          <input type={type} />
          <label htmlFor="">{title}</label>
        </>
      )}
      {type === "textarea" && (
        <>
          <label>
            <span>{title}</span>
            {required && <span className="text-red-400 pl-1">*</span>}
          </label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            className="px-2 py-1 border border-gray-600"
          ></textarea>
        </>
      )}
      {type === "file" && (
        <>
          <label>
            <span>{title}</span>
            {required && <span className="text-red-400 pl-1">*</span>}
          </label>
          <input type={type} multiple />
        </>
      )}
    </div>
  );
};

const AddProducts = () => {};

const ProductDetails = () => {
  const product = productData[0];

  return (
    <div className="w-full h-full flex flex-col gap-y-10 max-w-[2048px]">
      <h1 className="text-3xl font-bold">Product Details</h1>
      <div className="flex flex-col gap-y-5">
        <ProductInput
          className="grid grid-cols-2 w-1/2"
          title={"Product Name"}
          required
        />
        <ProductInput
          className="grid grid-cols-2 w-1/2"
          title={"Price"}
          required
        />
        <ProductInput
          className="grid grid-cols-2 w-1/2"
          title={"Quantity"}
          type={"number"}
          required
        />
        <ProductInput
          className="flex flex-row gap-x-2"
          title={"Show on carousel"}
          type={"checkbox"}
        />
        <ProductInput
          className="flex flex-row gap-x-2"
          title={"New Product"}
          type={"checkbox"}
        />

        <div className="mt-5 flex flex-col gap-y-5">
          <ProductInput
            title="Full Description"
            className="flex flex-col w-2/3 gap-y-2"
            type={"textarea"}
            required
          />

          <ProductInput
            title="Synopsis"
            className="flex flex-col w-2/3 gap-y-2"
            type={"textarea"}
            required
          />
        </div>

        <ProductInput
          required
          title="Image (at least 2)"
          type="file"
          className="grid grid-cols-2 w-1/2"
        />
      </div>

      <div className="flex flex-row gap-x-10 mt-10">
        <Button filled>Update Product</Button>
        <Button>Delete Product</Button>
      </div>
    </div>
  );
};


const Admin = () => {
  return (
    <div className="relative min-h-screen overflow-hidden w-full grid grid-cols-[300px_1fr] grid-rows-[min-content_1fr]">
      <div className="px-10 py-8 border-r relative z-20 border-b">ESSENTIA</div>
      <main className="p-10 pt-20 row-span-2 overflow-auto">
        <StatisticAdmin />
      </main>
      <div className="w-full">
        <Sidebar />
      </div>
    </div>
  );
};

export default Admin;
