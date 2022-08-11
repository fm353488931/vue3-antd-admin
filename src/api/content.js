import request from '@/utils/request'

export default {
  /* 新增敏感词 */
  add: (data) => request.post('/api/word', data),
  /* 更新敏感词 */
  update: (data) => request.put('/api/word', data),
  /* 获取敏感词列表 */
  getList: (params) => request.get('/api/word/getList', { params: { ...params } }),
  /* 删除敏感词 */
  delete: (id) => request.delete(`/word/${id}`),
}
