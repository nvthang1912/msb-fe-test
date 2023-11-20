import React from 'react'

export const APP_PATH = {
  ACCOUNT_INFO: '/account-info',
  PRODUCT_INFO: '/product-info',
}

const AccountInfo = React.lazy(() => import('../pages/AccountInfo'))
const ProductInfo = React.lazy(() => import('../pages/ProductInfo'))

export const PRIVATE_ROUTES = [
  {
    path: APP_PATH.ACCOUNT_INFO,
    component: AccountInfo,
  },
  {
    path: APP_PATH.PRODUCT_INFO,
    component: ProductInfo,
  },
]
