a<template>
  <div class="AnnounceList">
    <div class="AnnounceList-search mb-16">
      <a-form ref="searchFormRef" :model="searchFormState" layout="inline">
        <a-form-item name="" label="发布人">
          <a-input v-model:value="searchFormState.name" autocomplete="off" />
        </a-form-item>
        <a-form-item name="" label="通告状态">
          <a-select
            placeholder="请选择"
            v-model:value="searchFormState.sex"
            :options="constant.options.AnnounceListType"
          />
        </a-form-item>
        <a-form-item name="" label="发布时间">
          <a-date-picker />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button style="margin-left: 10px" @click="handleSearchFormReset">重置</a-button>
            <a-button type="primary" @click="handleSearch">查询</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
    <div class="AnnounceList-table">
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
              <a @click="handleApproval" v-if="props.tabActive == '2'">审批</a>
              <a-popconfirm
                v-if="props.tabActive == '1'"
                @confirm="handleRemove(record.id)"
                ok-text="确定"
                cancel-text="取消"
              >
                <template #title>
                  <p>确认下架当前选择内容</p>
                  <p>内容下架后，用户将不能砸前端看的此内容信息</p>
                </template>
                <a>下架</a>
              </a-popconfirm>
              <a-popconfirm @confirm="handleRemove(record.id)" ok-text="确定" cancel-text="取消">
                <template #title>
                  <p>确认删除当前选择内容</p>
                  <p>删除后内容不可恢复，是否确认删除</p>
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
<script>
export default {
  name: 'AnnounceList',
}
</script>
<script setup>
import useTable from '@/hooks/useSearchTable.js'
import constant from '@/enums/constant.js'
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
} = useTable('user', 'AnnounceList', { collectTime: undefined })
const table = reactive({
  columns: [
    {
      title: '发布人',
      dataIndex: 'jiaoshi',
      align: 'center',
      // ellipsis: true,
    },
    {
      title: '发布时间',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '通告费用',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '招募人数',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '报名人数',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '报名截至时间',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '通告状态',
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
