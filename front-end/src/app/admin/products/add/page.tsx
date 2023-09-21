import NewProduct from '@/components/page-components/admin/new-product/NewProduct'
import "../../../globals.css";
import React from 'react'
import AdminLayout from '@/components/layout/AdminLayout';

const AddProductPage = () => {
  return (
    <AdminLayout>
      <NewProduct />
    </AdminLayout>
  )
}

export default AddProductPage