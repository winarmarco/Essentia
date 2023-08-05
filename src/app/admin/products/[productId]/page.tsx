"use client";
import AdminLayout from "@/components/layout/AdminLayout";
import NewProduct from "@/components/page-components/admin/new-product/NewProduct";
import ProductForm from "@/components/page-components/admin/product-form/ProductForm";
import Loading from "@/components/shared/loading/Loading";
import { IProduct } from "@/utils/types";
import { useParams } from "next/navigation";
import React, {useEffect, useState} from "react";

const AdminProductDetailsPages = () => {
  const searchParams = useParams();
  const productId = searchParams["productId"];
  const [productData, setProductData] = useState<IProduct>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/api/products/${productId}`, {
        headers: {
          "Content-Type": "applicaion/json",
        },
      });

      const productData: IProduct = await res.json();

      console.log(productData)

      setProductData(productData)
    };

    fetchData();
  }, [productId]);


  return (
    <AdminLayout>
      {productData ? <ProductForm defaultValues={productData} formTitle="Product Details" /> : <Loading />}
    </AdminLayout>
  );
};

export default AdminProductDetailsPages;
