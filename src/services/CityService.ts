import { City } from '../types/Location'
import { http } from './BaseService'

export const GetCityList = async (): Promise<City[]> => {
  return await http.get(`${process.env.REACT_APP_CITY_ENDPOINT}/?depth=1`)
}

export const GetDistrictList = async (depth: string): Promise<City> => {
  return await http.get(
    `${process.env.REACT_APP_CITY_ENDPOINT}/p/${depth}?depth=2`
  )
}
