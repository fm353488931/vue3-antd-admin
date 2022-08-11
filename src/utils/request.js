import axios from 'axios'
import { useMainStore } from '@/store/main'
import { notification } from 'ant-design-vue'

const mainStore = useMainStore()
const service = axios.create({
  // baseURL: mainStore.APP_CONFIG.baseURL || 'http://172.16.90.18:8709', // 测试
  // baseURL: mainStore.APP_CONFIG.baseURL || 'http://192.168.30.176:8009/', // 志虎
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

service.interceptors.request.use(
  (config) => {
    const token = mainStore.APP_CONFIG.token || null
    // 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiJhZG1pbiIsInVzZXJfbmFtZSI6ImFkbWluIiwibG9naW5fdGltZSI6MTY1OTY2NDE1ODIwMiwic2NvcGUiOlsiICBhZG1pbiAiLCIgY29tbXVuaXR5ICIsIiBhcHAgIiwiTFkiXSwiY2xpZW50IjoiY29tbXVuaXR5IiwiaWQiOjE0MTcxMDA4Nzc2OTI5ODk0NDEsImV4cCI6MTY1OTcwNzM1OCwiYXV0aG9yaXRpZXMiOlsiMTU0ODg1OTI5OTc3NjcwODYwOSIsIjE0MTcxMDA4NzcyNjUxNzA0MzQiXSwianRpIjoiYWQ1NmUwZWYtN2YxMi00ZDNjLTlhYTMtZGVhYWI3NDczNDc5IiwiY2xpZW50X2lkIjoiYWRtaW4ifQ.jgqrYGdi6ERwx85Ax7DIOt7ovTWxlGTA4lhfw9JvBVYpNHyE1RDZJlV0n-e-LfSsFkWs5B7-CFv1bFlaZQ444jyM58K7h1aU1wdzDoJSbEWk0lsN1JIEDhvwpu2ke0t8QNYtNMkyVSOeso2YkfSiXmmk_X4h6K3NXz6flpBX_Hsgmb7BidaH7EHvDNahaNlrOl8ri8uPw1nOpvsRZx5Yv2NksVBElrM7FFMATa5L1hlbrcpPKzL3-Q2THdAs4K42TmJ68j-AO5cuQLRhqEDF-dzXjoAFXQTMm3ix3N1DTKtQR1tY1U5eiMDoAPOT_A3g73NvD3_DCbrbSZcFrsokuA'
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
      handleError(res.message)
    }
    return response.data
  },
  (error) => {
    const err = (error.response && error.response.data.message) || error.message
    handleError(err)
  }
)

const handleError = (message) => {
  notification.error({
    description: message,
  })
  return Promise.reject(message)
}

export default service
