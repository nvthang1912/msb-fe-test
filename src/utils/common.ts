export const getToken = () => {
  return localStorage.getItem('ACCESS_TOKEN')
}

export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem('USER') as string) ?? ''
}
