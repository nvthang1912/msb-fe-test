import { http } from './BaseService'
import { LoginInfo } from '../types/User'

const LOGIN_PATH = 'auth/login'

export const LoginAccount = async (loginInfo: LoginInfo) => {
  return await http.post(
    `${process.env.REACT_APP_LOGIN_ENDPOINT}/${LOGIN_PATH}`,
    loginInfo
  )
}

export const LogoutAccount = () => {
  return localStorage.clear()
}
