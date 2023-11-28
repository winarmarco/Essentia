"use client";

import ProductForm from "@/components/page-components/admin/product-form/ProductForm";
import Loading from "@/components/shared/loading/Loading";
import { fetchProductDetails } from "@/utils/actions/products-action";
import { IProduct } from "@/utils/types/products";
import { useParams } from "next/navigation";
import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";

const AdminProductDetailsPages = () => {
  const searchParams = useParams();
  const productId = searchParams["productId"];
  const [productData, setProductData] = useState<IProduct>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProduct = await fetchProductDetails(productId);

        if (!fetchedProduct) throw new Error("Error fetching product")

        setProductData(fetchedProduct.product);
      } catch (error) {
        toast.error("Error fetching product. Please try again later");
      }
    };

    fetchData();
  }, [productId]);



  return (
    <>
      {productData ? <ProductForm defaultValues={productData} formTitle="Product Details" /> : <Loading />}
    </>
  );
};

export default AdminProductDetailsPages;
