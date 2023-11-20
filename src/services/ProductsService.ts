import { Product } from '../types'
import { http } from './BaseService'

const PRODUCTS_PATH = 'products'

export const GetMockProducts = async (): Promise<Product[]> => {
  return await http.get(
    `${process.env.REACT_APP_MOCK_ENDPOINT}/${PRODUCTS_PATH}`
  )
}
