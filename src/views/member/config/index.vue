<template>
  <div class="config">
    <div class="config-search mb-16">
      <a-form ref="searchFormRef" :model="searchFormState" layout="inline">
        <a-form-item name="typeName" label="套餐名称">
          <a-input v-model:value="searchFormState.typeName" autocomplete="off" />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button style="margin-left: 10px" @click="handleSearchFormReset">重置</a-button>
            <a-button type="primary" @click="handleSearch">查询</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
    <div class="config-btn mtb-16">
      <a-button type="primary" @click="handleAdd"> 新增套餐 </a-button>
    </div>
    <div class="config-table">
      <a-table
        rowKey="id"
        :columns="table.columns"
        :data-source="tableData.dataSource"
        :pagination="tablePagination"
        :loading="tableLoading"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'money'">
            {{ record.originalPrice - record.discountAmount }}
          </template>
          <template v-if="column.dataIndex === 'action'">
            <a-space>
              <!-- <a @click="handleEdit">编辑</a> -->
              <a-popconfirm
                title="确认删除当前选择套餐"
                @confirm="handleRemove(record.id)"
                ok-text="确定"
                cancel-text="取消"
              >
                <!-- <template #title>
                  <p>确认删除当前选择群演</p>
                  <p>删除群演后，该用户再次登陆需要重新进行群演认证</p>
                </template> -->
                <a>删除</a>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>
    <div class="config-modal">
      <VModal ref="modalRef" :title="modal.title">
        <template #content>
          <ConfigForm @cancel="handleCancel" />
        </template>
      </VModal>
    </div>
  </div>
</template>
<script setup>
import useTable from '@/hooks/useSearchTable.js'
import ConfigForm from './components/ConfigForm.vue'
const {
  searchFormRef,
  searchFormState,
  tableLoading,
  tableData,
  tablePagination,
  handleTableChange,
  handleSearch,
  handleSearchFormReset,
} = useTable('member', 'getList', { typeName: '' })
const table = reactive({
  columns: [
    {
      title: '套餐名称',
      dataIndex: 'typeName',
      align: 'center',
    },
    {
      title: '原价金额',
      dataIndex: 'originalPrice',
      align: 'center',
    },
    {
      title: '折扣金额',
      dataIndex: 'discountAmount',
      align: 'center',
    },
    {
      title: '套餐天数',
      dataIndex: 'days',
      align: 'center',
    },
    {
      title: '实付金额',
      dataIndex: 'money',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
    },
  ],
  // data: [{}, {}],
})
const modalRef = ref(null)
const modal = reactive({
  title: '',
  footer: false,
})
const handleAdd = () => {
  modal.title = '新增'
  modalRef.value.onShow()
}
// const handleEdit = () => {
//   modal.title = '编辑'
//   modalRef.value.onShow()
// }
const handleRemove = () => {}
onMounted(() => {
  handleSearch()
})
const handleCancel = () => {
  modalRef.value.onClose()
  handleSearch()
}
</script>

<style scoped lang="less"></style>
