import { ref, reactive, computed } from 'vue'
import _ from 'lodash'
import $api from '@/api'

const useTable = (moduleName, apiName, searchFields = {}) => {
  // 查询表单相关
  const searchFormRef = ref()
  const searchFormState = reactive({
    ...searchFields,
  })
  let queryParams = {
    ...searchFields,
    current: 1,
    size: 10,
  }
  const exportParams = ref({})

  // 表格相关
  const tableLoading = ref(false)
  const tableData = reactive({
    dataSource: [],
  })
  const paginationData = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  })

  const tablePagination = computed(() => ({
    total: paginationData.total,
    current: paginationData.current,
    pageSize: paginationData.pageSize,
    showTotal: (total) => `共 ${total} 条`,
    showQuickJumper: true,
    showSizeChanger: true,
  }))

  const getPageData = () => {
    tableLoading.value = true
    $api[moduleName][apiName](queryParams)
      .then((data) => {
        // console.log(data)
        const { content = [], total = 0 } = data.data || {}
        tableData.dataSource = content
        paginationData.total = total
        // console.log(tableData.dataSource)
      })
      .finally(() => {
        tableLoading.value = false
      })
  }

  const handleSearch = () => {
    queryParams = {
      ...queryParams,
      ...searchFormState,
      current: 1,
    }

    paginationData.current = 1

    // 查询表单的参数特殊处理
    if (queryParams.hasOwnProperty('noticeTime')) {
      queryParams.noticeTimeStart = queryParams.noticeTime?.[0]?.format('YYYY-MM-DD 00:00:00')
      queryParams.noticeTimeEnd = queryParams.noticeTime?.[1]?.format('YYYY-MM-DD 23:59:59')
      delete queryParams.noticeTime
    }

    exportParams.value = _.omit(queryParams, ['current', 'size'])
    getPageData()
  }

  const handleSearchFormReset = () => {
    searchFormRef.value.resetFields()
    handleSearch()
  }

  const handleTableChange = ({ current, pageSize }) => {
    queryParams.current = paginationData.current = current
    queryParams.size = paginationData.pageSize = pageSize
    getPageData()
  }

  return {
    searchFormRef,
    searchFormState,
    exportParams,
    tableLoading,
    tableData,
    paginationData,
    tablePagination,
    getPageData,
    handleSearch,
    handleSearchFormReset,
    handleTableChange,
  }
}

export default useTable
