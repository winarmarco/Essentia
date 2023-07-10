"use client";

import React from "react";
import "../globals.css";
import {CategoryScale, TimeScale} from "chart.js";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";
import Sidebar from "@/components/page-components/admin/sidebar/Sidebar";
import ProductAdmin from "@/components/page-components/admin/product/Product";
import NewProduct from "@/components/page-components/admin/new-product/NewProduct";
import ProductDetailsCarousel from "@/components/page-components/product/product-details/product-details-image-carousel/ProductDetailsCarousel";

Chart.register(CategoryScale, TimeScale);



const Settings = () => {};


const Admin = () => {

  return (
    <div className="relative min-h-screen overflow-hidden w-full grid grid-cols-[300px_1fr] grid-rows-[min-content_1fr]">
      <div className="px-10 py-8 border-r relative z-20 border-b">ESSENTIA</div>
      <main className="p-10 pt-20 row-span-2 overflow-auto">
        <NewProduct/>
      </main>
      <div className="w-full">
        <Sidebar />
      </div>
    </div>
  );
};

export default Admin;
