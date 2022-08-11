import request from '@/utils/request'

export default {
  uploadUrl: `${request.defaults.baseURL}/base/files/upload`, //上传
  selectPageCoupon: (params) => request.get('coupon/coupon/selectPageCoupon', params),
}
