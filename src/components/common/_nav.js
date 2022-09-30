import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cibCodepen,
  cibLivejournal,
  cilSpeedometer,
  cibProbot,
  cilFactory,
  cibBitcoin,
  cilFlagAlt,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Invoice',
  },
  {
    component: CNavItem,
    name: 'Quotation Bill',
    to: '/invoice/draft',
    icon: <CIcon icon={cibProbot} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Booked List',
    to: '/invoice/blocked',
    icon: <CIcon icon={cibBitcoin} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Quotation List',
    to: '/invoice/quotation',
    icon: <CIcon icon={cibProbot} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Invoice List',
    to: '/invoice/list',
    icon: <CIcon icon={cilFlagAlt} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Cash Invoices',
    to: '/invoice/paid',
    icon: <CIcon icon={cibBitcoin} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Taxable Invoices',
    to: '/invoice/printed',
    icon: <CIcon icon={cibBitcoin} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Invoice Received',
  },
  {
    component: CNavItem,
    name: 'Receive',
    to: '/returns',
    icon: <CIcon icon={cibBitcoin} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Pending List',
    to: '/returns/pending',
    icon: <CIcon icon={cibBitcoin} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Received List',
    to: '/returns/list',
    icon: <CIcon icon={cibBitcoin} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Damaged List',
    to: '/returns/damaged',
    icon: <CIcon icon={cibBitcoin} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Products',
  },
  {
    component: CNavItem,
    name: 'Add Product',
    to: '/products/add',
    icon: <CIcon icon={cibProbot} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Products List',
    to: '/products/list/1',
    icon: <CIcon icon={cibProbot} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Item Finder',
    to: '/products/find',
    icon: <CIcon icon={cibProbot} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Category',
  },
  // {
  //   component: CNavItem,
  //   name: 'Add Category',
  //   to: '/category/add',
  //   icon: <CIcon icon={cilFactory} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'List',
    to: '/category/list',
    icon: <CIcon icon={cilFactory} customClassName="nav-icon" />,
  },
]

export default _nav
