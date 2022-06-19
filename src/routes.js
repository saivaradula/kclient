import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Products
const Products = React.lazy(() => import('./components/product/Products'))
const AddProduct = React.lazy(() => import('./components/product/addProduct'))
const EditProduct = React.lazy(() => import('./components/product/editProduct'))
const PrintPR = React.lazy(() => import('./components/product/printPR'))
const ProductsPrint = React.lazy(() => import('./components/product/print'))
const addCategory = React.lazy(() => import('./components/category/addCategory'))
const Categories = React.lazy(() => import('./components/category/list'))
const DraftInvoice = React.lazy(() => import('./components/invoice/draftinvoice'))
const UpdateDraftInvoice = React.lazy(() => import('./components/invoice/updatedraftinvoice'))
const DraftList = React.lazy(() => import('./components/invoice/draft'))
const Invoices = React.lazy(() => import('./components/invoice/list'))
const PaidInvoices = React.lazy(() => import('./components/invoice/paidinvoices'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/invoice/draft', name: 'Rent Product', component: DraftInvoice },
  { path: '/invoice/updatedraft', name: 'Rent Product', component: UpdateDraftInvoice },
  { path: '/invoice/quotation', name: 'Rent Product', component: DraftList },
  { path: '/invoice/list', name: 'Rent Product', component: Invoices },
  { path: '/invoice/paid', name: 'Rent Product', component: PaidInvoices },

  { path: '/products', exact: true, name: 'Products', component: Products },
  { path: '/products/:id/edit', exact: true, name: 'Edit Product', component: EditProduct },
  { path: '/products/list', exact: true, name: 'List', component: Products },
  { path: '/products/add', exact: true, name: 'Add', component: AddProduct },
  { path: '/products/print', exact: true, name: 'Print', component: ProductsPrint },
  { path: '/products/:id', exact: true, name: 'Print', component: PrintPR },
  { path: '/category/list', exact: true, name: 'Category', component: Categories },
  { path: '/category/add', exact: true, name: 'Add Category', component: addCategory },
]

export default routes
