import axios from 'axios'
import { deleteCookie, getCookie } from 'cookies-next/client'

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = getCookie('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       deleteCookie('token')
//       deleteCookie('user')
//       window.location.href = '/login'
//     }
//     return Promise.reject(error)
//   },
// )

export default api
