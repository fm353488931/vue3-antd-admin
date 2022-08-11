<template>
  <div class="PerformanceTag">
    <div class="PerformanceTag-search mb-16">
      <a-form ref="searchFormRef" :model="searchFormState" layout="inline">
        <a-form-item name="" label="标签名">
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
    <div class="PerformanceTag-btn mtb-16">
      <a-button type="primary" @click="handleAdd"> 新增标签 </a-button>
    </div>
    <div class="PerformanceTag-table">
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
              <a-popconfirm
                title="确认删除当前选标签"
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
    <div class="PerformanceTag-modal">
      <VModal ref="modalRef" :title="modal.title">
        <template #content>
          <PerformanceTagForm ref="performanceTagForm" />
        </template>
      </VModal>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PerformanceTag',
}
</script>
<script setup>
import useTable from '@/hooks/useSearchTable.js'
import PerformanceTagForm from './PerformanceTagForm.vue'
const {
  searchFormRef,
  searchFormState,
  tableLoading,
  // tableData,
  tablePagination,
  handleTableChange,
  handleSearch,
  handleSearchFormReset,
} = useTable('user', 'PerformanceTag', { collectTime: undefined })
const table = reactive({
  columns: [
    {
      title: '标签名',
      dataIndex: 'jiaoshi',
      align: 'center',
      // ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '创建人',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '关联用户数',
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
const handleAdd = () => {
  modal.title = '新增标签'
  modalRef.value.onShow()
}
const handleEdit = () => {
  modal.title = '编辑标签'
  modalRef.value.onShow()
}
const handleRemove = () => {}
</script>

<style scoped lang="less"></style>
