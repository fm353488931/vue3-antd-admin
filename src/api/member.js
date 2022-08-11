import request from '@/utils/request'

export default {
  /* 新增套餐 */
  add: (data) => request.post('/api/vip', data),
  /* 更新套餐 */
  update: (data) => request.put('/api/vip', data),
  /* 套餐列表 */
  getList: (params) => request.get('/api/vip/getList', { params: { ...params } }),
  /* 查看套餐 */
  getById: (id) => request.get(`/api/vip/${id}`),
  /* 删除套餐 */
  delete: (id) => request.delete(`/api/vip/${id}`),
  /* 会员列表 */
  getMemberList: (params) => request.get('/api/vip/member', { params: { ...params } }),
  /* 账单列表 */
  getBillList: (params) => request.get('/api/vip/order', { params: { ...params } }),
}
