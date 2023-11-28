import ProductForm from "@/components/page-components/admin/product-form/ProductForm";
import "@/app/globals.css";
import React from 'react'
import AdminLayout from '@/components/layout/AdminLayout';

const AddProductPage = () => {
  return (
    <ProductForm newProduct />
  )
}

export default AddProductPage