export interface LoginInfo {
  username: string
  password: string
}

export interface LoginResponse {
  email: string
  firstName: string
  gender: string
  id: number
  image: string
  lastName: string
  token: string
  username: string
}

export interface LoginRequest {
  username: string
  password: string
}
