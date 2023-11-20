import axios from 'axios'

const http = axios.create({
  baseURL: '',
})

http.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {}
    config.headers['Content-Type'] = 'application/json'
    config.headers['Accept'] = 'application/json'
    return config
  },
  (error) => Promise.reject(error)
)

http.interceptors.response.use(
  (response) => {
    if (response.data) {
      return response.data.results ? response.data.results : response.data
    }
    return response
  },
  (error) => {
    const err = error?.response?.data || error
    return Promise.reject(err)
  }
)

export { http }
