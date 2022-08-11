<template>
  <div class="tourist">
    <div class="tourist-search mb-16">
      <a-form ref="searchFormRef" :model="searchFormState" layout="inline">
        <a-form-item name="" label="姓名">
          <a-input v-model:value="searchFormState.name" autocomplete="off" />
        </a-form-item>
        <a-form-item name="" label="手机号">
          <a-input v-model:value="searchFormState.phone" autocomplete="off" />
        </a-form-item>
        <a-form-item name="" label="性别">
          <a-select
            placeholder="请选择"
            v-model:value="searchFormState.sex"
            :options="constant.options.sex"
          />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button style="margin-left: 10px" @click="handleSearchFormReset">重置</a-button>
            <a-button type="primary" @click="handleSearch">查询</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
    <div class="tourist-table">
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
              <a @click="handleDetail">详情</a>
              <a-popconfirm
                title="确认删除当前选择群演"
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
  </div>
</template>

<script>
export default {
  name: 'Tourist',
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
} = useTable('user', 'tourist', { collectTime: undefined })
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
      title: '姓名/昵称',
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
      title: '角色',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '最近登录时间',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
  ],
  data: [{}, {}],
})
const handleDetail = () => {}
const handleRemove = () => {}
</script>

<style scoped lang="less"></style>
