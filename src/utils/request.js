import axios from 'axios'
import { useMainStore } from '@/store/main'
import { notification } from 'ant-design-vue'

const mainStore = useMainStore()
const service = axios.create({
  // baseURL: '',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

service.interceptors.request.use(
  (config) => {
    const token = mainStore.APP_CONFIG.token
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  (error) => {
    handleError(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const res = response.data
    // 下载
    if (response.headers['content-type'] === 'application/octet-stream') {
      if (!res) {
        return
      }
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      let title = response.headers['content-disposition']
      title = decodeURIComponent(title.substr(21))
      link.setAttribute('download', title)
      document.body.appendChild(link)
      link.click()
    }
    // 不成功
    else if (!res.success) {
      return handleError(res.message)
    }
    return response.data
  },
  (error) => {
    const err = (error.response && error.response.data.message) || error.message
    return handleError(err)
  }
)

const handleError = (message) => {
  notification.error({
    description: message,
  })
  return Promise.reject(message)
}

export default service
