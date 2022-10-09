<template>
  <div class="SearchTable">
    <div class="mb-20">
      <slot name="tableTop"></slot>
    </div>
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

let searchModel = {}

//获取列表
const getList = (search) => {
  if (search) {
    searchModel = { ...search }
  }
  const request = instance.proxy.$attrs.request
  if (!request) return
  loading.value = true
  request({ current: pagination.current, size: pagination.pageSize, ...searchModel })
    .then((res) => {
      tableData.value = res.content
      pagination.total = res.total
    })
    .catch(() => {
      tableData.value = []
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

//查询
const onSearch = (search = {}) => {
  pagination.current = 1
  pagination.pageSize = 10
  getList(search)
}

//重置
const reset = () => {
  pagination.current = 1
  pagination.pageSize = 10
  pagination.total = 0
  getList({})
}

//组装表格信息
const getBindValues = computed(() => {
  return {
    dataSource: tableData.value,
    pagination,
    loading,
    rowKey: 'id',
    size: 'middle',
    ...instance.proxy.$attrs,
  }
})

defineExpose({
  tableData,
  getList,
  onSearch,
  reset,
})
</script>

<style lang="less" scoped></style>
