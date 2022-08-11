import request from '@/utils/request'

export default {
  /* 新增字典 */
  add: (data) => request.post('/api/dict', data),
  /* 获取字典列表 */
  getList: (params) => request.get('/api/dict/getList', { params: { ...params } }),
  /* 获取字典详情 */
  getDetail: (params) => request.get('/api/dict/detail', { params: { ...params } }),
}
