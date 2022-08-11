<template>
  <div class="auth">
    <div class="auth-search mb-16">
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
    <div class="auth-table">
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
            </a-space>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Auth',
}
</script>
<script setup>
import useTable from '@/hooks/useSearchTable.js'
import constant from '@/enums/constant.js'
const {
  searchFormRef,
  searchFormState,
  tableLoading,
  // tableData,
  tablePagination,
  handleTableChange,
  handleSearch,
  handleSearchFormReset,
} = useTable('user', 'auth', { collectTime: undefined })
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
      title: '证件号',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '手机号',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '提交时间',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '认证结果',
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
const handleDetail = () => {}
const handleRemove = () => {}
</script>

<style scoped lang="less"></style>
