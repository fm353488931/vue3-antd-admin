<template>
  <div class="banner">
    <div class="banner-head"> banner管理 </div>
    <div class="banner-btn mtb-16">
      <a-button type="primary" @click="handleAdd"> 新增 </a-button>
    </div>
    <div class="banner-table">
      <a-table
        rowKey="id"
        :columns="table.columns"
        :data-source="tableData.dataSource"
        :pagination="tablePagination"
        :loading="tableLoading"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.dataIndex === 'bannerUrl'">
            <img :src="record.bannerUrl" alt="" style="width: 80px; height: 60px" />
          </template>
          <template v-if="column.dataIndex === 'state'">
            {{ Enums.map.upState[record.state] }}
          </template>
          <template v-if="column.dataIndex === 'action'">
            <a-space>
              <a @click="handleUpdate(record, 1)" v-if="record.state == '2'">上架</a>
              <a-popconfirm
                v-if="record.state == '1'"
                title="确认下架当前banner"
                @confirm="handleUpdate(record, 0)"
                ok-text="确定"
                cancel-text="取消"
              >
                <a>下架</a>
              </a-popconfirm>

              <a @click="handleEdit(record.id)" v-if="record.state == '2'">编辑</a>
              <a-popconfirm
                title="确认删除当前banner"
                @confirm="handleRemove(record.id)"
                ok-text="确定"
                cancel-text="取消"
              >
                <a>删除</a>
              </a-popconfirm>
              <a @click="handleTop(record, 1)" v-if="index != 0">置顶</a>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>
    <div class="banner-modal">
      <VModal ref="modalRef" :title="modal.title">
        <template #content>
          <BannerForm ref="bannerFormRef" @cancel="handleCancel" />
        </template>
      </VModal>
    </div>
  </div>
</template>
<script setup>
import VModal from '@/components/VModal.vue'
import BannerForm from './components/BannerForm.vue'
import useTable from '@/hooks/useSearchTable.js'
import Enums from '@/enums/constant.js'
import $api from '@/api'
const $message = inject('$message')
const { tableLoading, tableData, tablePagination, handleTableChange, handleSearch } = useTable(
  'banner',
  'getList'
)
const table = reactive({
  columns: [
    {
      title: '名称',
      dataIndex: 'bannerName',
      align: 'center',
      // ellipsis: true,
    },
    {
      title: '链接',
      dataIndex: 'outerLink',
      align: 'center',
    },
    {
      title: '图片',
      dataIndex: 'bannerUrl',
      align: 'center',
    },
    {
      title: '上架时间',
      dataIndex: 'putOnTime',
      align: 'center',
    },
    {
      title: '操作人',
      dataIndex: 'operator',
      align: 'center',
    },
    {
      title: '上架状态',
      dataIndex: 'state',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
    },
  ],
})
const modalRef = ref(null)
const modal = reactive({
  title: '',
  footer: false,
})
const handleAdd = () => {
  modal.title = '新增banner'
  modalRef.value.onShow()
}
const handleUpdate = (record, state) => {
  $api.banner.update({ id: record.id, state }).then(() => {
    $message.success(`${state == 1 ? '上架' : '下架'}成功`)
    handleSearch()
  })
}
const handleTop = (record, isTopping) => {
  $api.banner.update({ id: record.id, isTopping }).then(() => {
    $message.success(`置顶成功`)
    handleSearch()
  })
}
const bannerFormRef = ref(null)
// const that = getCurrentInstance().ctx
const handleEdit = (id) => {
  modal.title = '编辑banner'
  modalRef.value.onShow()
  nextTick(() => {
    bannerFormRef.value.onEdit(id)
  })
}
const handleRemove = (id) => {
  $api.banner.delete(id).then(() => {
    $message.success('删除成功')
    handleSearch()
  })
}
const handleCancel = () => {
  modalRef.value.onClose()
  handleSearch()
}

onMounted(() => {
  handleSearch()
})
</script>

<style scoped lang="less">
.banner {
  &-head {
    position: relative;
    text-indent: 15px;
    &:after {
      content: '';
      display: block;
      width: 3px;
      height: 15px;
      background: @primary;
      position: absolute;
      left: 0;
      top: 3px;
    }
  }
  &-btn {
  }
  &-table {
  }
}
</style>
