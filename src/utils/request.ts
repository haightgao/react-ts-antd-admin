import { message } from 'antd'
import axios from 'axios'

const request = axios.create({
  timeout: 5000,
})

request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = {
      ...config.headers,
      authorization: token,
    }
  }
  return config
})

request.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    console.log(error)
    message.error(error.message)
    return Promise.reject(error)
  }
)

export default request
