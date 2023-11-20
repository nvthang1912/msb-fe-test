export interface City {
  code: number
  codename: string
  districts: any[]
  division_type: string
  name: string
  phone_code: number
}

export interface District {
  code: number
  codename: string
  division_type: string
  name: string
  province_code: number
  wards: any[]
}