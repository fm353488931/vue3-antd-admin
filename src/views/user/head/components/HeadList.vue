<template>
  <div class="HeadList">
    <div class="HeadList-search mb-16">
      <a-form ref="searchFormRef" :model="searchFormState" layout="inline">
        <a-form-item name="" label="姓名">
          <a-input v-model:value="searchFormState.name" autocomplete="off" />
        </a-form-item>
        <a-form-item name="" label="手机号">
          <a-input v-model:value="searchFormState.phone" autocomplete="off" />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button style="margin-left: 10px" @click="handleSearchFormReset">重置</a-button>
            <a-button type="primary" @click="handleSearch">查询</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
    <div class="HeadList-table">
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
              <a @click="handleDetail">详情</a>
              <a @click="handleApproval" v-if="tabActive == '2'">审核</a>
              <a-popconfirm
                :title="tabActive == '1' ? '确认删除当前选择群头' : '确认删除当前选择群头认证申请'"
                @confirm="handleRemove(record.id)"
                ok-text="确定"
                cancel-text="取消"
              >
                <a>删除</a>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>
    <div class="HeadList-modal">
      <VModal ref="modalRef" :title="modal.title">
        <template #content>
          <!-- <PerformanceTagForm ref="performanceTagForm" /> -->
          <VApprovalForm ref="vApprovalForm" />
        </template>
      </VModal>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeadList',
}
</script>
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
} = useTable('user', 'HeadList', { collectTime: undefined })
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
      title: '姓名',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '手机号',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '性别',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '身份证号',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '是否VIP',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '申请认证时间',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '审核状态',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '账号状态',
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
const modalRef = ref(null)
const modal = reactive({
  title: '',
  footer: false,
})
const handleDetail = () => {}
const handleApproval = () => {
  modal.title = '审批'
  modalRef.value.onShow()
}
const handleRemove = () => {}
onMounted(() => {
  if (props.tabActive == '2') {
    table.columns.splice(8, 1)
  }
})
</script>

<style scoped lang="less"></style>
