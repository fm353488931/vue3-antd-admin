<template>
  <div class="bill">
    <div class="bill-search mb-16">
      <a-form ref="searchFormRef" :model="searchFormState" layout="inline">
        <a-form-item name="" label="手机号">
          <a-input v-model:value="searchFormState.name" autocomplete="off" />
        </a-form-item>
        <a-form-item name="" label="支付时间">
          <a-range-picker />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button style="margin-left: 10px" @click="handleSearchFormReset">重置</a-button>
            <a-button type="primary" @click="handleSearch">查询</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
    <div class="bill-table">
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
              <a @click="handleDetail">编辑</a>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>
    <div class="sensitive-modal">
      <VModal ref="modalRef" :title="modal.title">
        <template #content>
          <BillDetail />
        </template>
      </VModal>
    </div>
  </div>
</template>
<script setup>
import useTable from '@/hooks/useSearchTable.js'
import BillDetail from './components/BillDetail.vue'
const {
  searchFormRef,
  searchFormState,
  tableLoading,
  // tableData,
  tablePagination,
  handleTableChange,
  handleSearch,
  handleSearchFormReset,
} = useTable('user', 'bill', { collectTime: undefined })
const table = reactive({
  columns: [
    {
      title: '套餐',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '支付时间',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '付款人',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '手机号',
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
const modalRef = ref(null)
const modal = reactive({
  title: '',
  footer: false,
})
const handleDetail = () => {
  modal.title = '账单详情'
  modalRef.value.onShow()
}
onMounted(() => {})
</script>

<style scoped lang="less"></style>
