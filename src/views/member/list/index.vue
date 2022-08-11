<template>
  <div class="list">
    <div class="list-search mb-16">
      <a-form ref="searchFormRef" :model="searchFormState" layout="inline">
        <a-form-item name="" label="套餐名称">
          <a-input v-model:value="searchFormState.name" autocomplete="off" />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button style="margin-left: 10px" @click="handleSearchFormReset">重置</a-button>
            <a-button type="primary" @click="handleSearch">查询</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
    <div class="list-table">
      <a-table
        rowKey="id"
        :columns="table.columns"
        :data-source="table.data"
        :pagination="tablePagination"
        :loading="tableLoading"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <!-- <template v-if="column.dataIndex === 'name'">
          </template> -->
          <template v-if="column.dataIndex === 'action'">
            <a-space>
              <a @click="handleEdit">编辑</a>
              <a-popconfirm @confirm="handleRemove(record.id)" ok-text="确定" cancel-text="取消">
                <template #title>
                  <p>确认删除当前选择群演</p>
                  <p>删除群演后，该用户再次登陆需要重新进行群演认证</p>
                </template>
                <a>删除</a>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script setup>
import useTable from '@/hooks/useSearchTable.js'
// import constant from '@/enums/constant.js'
const props = defineProps({
  tabActive: {
    type: String,
    default: '',
  },
})
const {
  searchFormRef,
  searchFormState,
  tableLoading,
  // tableData,
  tablePagination,
  handleTableChange,
  handleSearch,
  handleSearchFormReset,
} = useTable('user', 'list', { collectTime: undefined })
const table = reactive({
  columns: [
    {
      title: '序号',
      key: 'index',
      align: 'center',
      customRender: ({ index }) => `${index + 1}`,
      width: 80,
    },
    {
      title: '用户昵称',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '手机号',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '角色名称',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '会员时间段',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '当前套餐',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '剩余天数',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '支付金额',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
    },
  ],
  data: [{}, {}],
})
onMounted(() => {})
const handleDetail = () => {}
const handleEdit = () => {}
const handleRemove = () => {}
</script>

<style scoped lang="less"></style>
