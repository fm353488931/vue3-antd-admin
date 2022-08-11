<template>
  <div class="crew">
    <div class="crew-search mb-16">
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
    <div class="crew-btn mtb-16">
      <a-button type="primary" @click="handleAdd"> 新增 </a-button>
    </div>
    <div class="crew-table">
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
              <a @click="handleDetail">详情</a>
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
    <div class="crew-modal">
      <VModal ref="modalRef" :title="modal.title">
        <template #content>
          <CrewForm />
        </template>
      </VModal>
    </div>
  </div>
</template>
<script setup>
import useTable from '@/hooks/useSearchTable.js'
import CrewForm from './components/CrewForm.vue'
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
} = useTable('user', 'crew', { collectTime: undefined })
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
      title: '联系方式',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '公司名称',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '邮箱',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '职务',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '邀请人',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '是否vip',
      dataIndex: 'jiaoshi',
      align: 'center',
    },
    {
      title: '创建时间',
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
const handleAdd = () => {
  modal.title = '新增'
  modalRef.value.onShow()
}
const handleEdit = () => {
  modal.title = '编辑'
  modalRef.value.onShow()
}
const handleDetail = () => {}
const handleRemove = () => {}
onMounted(() => {})
</script>

<style scoped lang="less"></style>
