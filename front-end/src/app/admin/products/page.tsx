import AdminLayout from '@/components/layout/AdminLayout'
import ProductAdmin from '@/components/page-components/admin/product/Product'
import { fetchProduct } from '@/utils/actions/products-action'
import { notFound } from 'next/navigation'
import React from 'react'

const ProductAdminPage = async () => {
  const fetchedProduct = await fetchProduct();

  if (!fetchedProduct) return notFound();


  return (
    <ProductAdmin productData={fetchedProduct}/>
  )
}


export default ProductAdminPage