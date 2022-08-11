<template>
  <div class="SearchTable">
    <a-table ref="tableElRef" v-bind="getBindValues" @change="changeTable" :loading="loading">
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data"></slot>
      </template>
    </a-table>
  </div>
</template>
<script setup>
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()
console.log('instance', instance)

const loading = ref(false)
const tableElRef = ref(null)
const pagination = reactive({
  showSizeChanger: true,
  showQuickJumper: true,
  pageSize: 10,
  pageSizeOptions: ['10', '20', '50', '100'],
  current: 1,
  total: 0,
  showTotal: (total) => `共有${total}条数据`,
})
const tableData = ref([])

//获取列表
const getList = () => {
  const request = instance.ctx.$attrs.request
  if (!request) return
  loading.value = true
  request({ current: pagination.current, size: pagination.pageSize })
    .then((res) => {
      tableData.value = res.data.content
      pagination.total = res.data.total
    })
    .finally(() => {
      loading.value = false
    })
}
getList()

//翻页
const changeTable = (page) => {
  pagination.current = page.current
  pagination.pageSize = page.pageSize
  getList()
}
//组装表格信息
const getBindValues = computed(() => {
  return {
    dataSource: tableData.value,
    pagination,
    loading,
    rowKey: 'id',
    size: 'middle',
    ...instance.ctx.$attrs,
  }
})
</script>

<style lang="less" scoped>
.SearchTable {
}
</style>
