import AdminLayout from '@/components/layout/AdminLayout'
import ProductAdmin from '@/components/page-components/admin/product/Product'
import React from 'react'

const ProductAdminPage = async () => {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
    headers: {
      "Content-Type": "applicaion/json",
    }
  })

  const productsData = await res.json();


  return (
    <AdminLayout>
      <ProductAdmin productData={productsData}/>
    </AdminLayout>
  )
}


export default ProductAdminPage