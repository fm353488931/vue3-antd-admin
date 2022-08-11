import request from '@/utils/request'

export default {
  /* 新增banner */
  add: (data) => request.post('/api/banner', data),
  /* banner列表 */
  getList: (params) => request.get('/api/banner/getList', { params: { ...params } }),
  /* banner update */
  update: (data) => request.put('/api/banner', data),
  /* banner id查询 */
  getById: (id) => request.get(`/api/banner/${id}`),
  /* banner id删除 */
  delete: (id) => request.delete(`/api/banner/${id}`),
}
