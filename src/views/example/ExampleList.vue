<template>
  <div class="ExampleList">
    <SearchForm ref="searchForm" :items="items" @onSearch="onSearch" @onReset="searchTable.reset()">
      <template #age="{ model, field }">
        <a-input-number v-model:value="model.ageStart" placeholder="请输入" />
        -
        <a-input-number v-model:value="model.ageEnd" placeholder="请输入" />
      </template>
    </SearchForm>
    <SearchTable
      ref="searchTable"
      :request="request"
      :columns="columns"
      :rowKey="(record) => record.id"
    >
      <template #tableTop>
        <a-space>
          <a-button type="primary">
            <template #icon>
              <PlusOutlined />
            </template>
            新增
          </a-button>
          <a-button type="primary" @click="openDialog"> 弹窗 </a-button>
        </a-space>
      </template>
      <template #bodyCell="{ column, text, record }">
        <span v-if="column.dataIndex === 'action'">
          <a-space>
            <a href="javascript:;" @click="editRecord(record)">编辑</a>
            <a href="javascript:;" @click="deleteRecord(record)" class="danger">删除</a>
          </a-space>
        </span>
      </template>
    </SearchTable>
    <Dialog ref="dialog">
      <div> content </div>
    </Dialog>
  </div>
</template>

<script setup>
import { createVNode } from 'vue'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { Modal, message } from 'ant-design-vue'
import $api from '@/api'
import Constant from '@/enums/constant'
import SearchForm from '@/components/SearchForm.vue'
import SearchTable from '@/components/SearchTable.vue'
import Dialog from '@/components/Dialog.vue'

const searchForm = ref(null)
const searchTable = ref(null)

const changeCommunityId = (value, option) => {
  console.log(value, option)
  searchForm.value.formModel.customerType = undefined
}

const items = [
  {
    label: '搜索',
    field: 'keyword',
    component: 'AInput',
    props: {
      placeholder: '请输入关键字',
      style: {
        width: '280px',
      },
    },
  },
  {
    label: '所属项目',
    field: 'communityId',
    component: 'ASelect',
    props: {
      options: [{ id: '1', name: '项目1' }],
      fieldNames: {
        label: 'name',
        value: 'id',
      },
      onChange: (value, option) => changeCommunityId(value, option),
    },
  },
  {
    label: '客户类型',
    field: 'customerType',
    component: 'ASelect',
    props: {
      options: Constant.options.yesNo,
    },
  },
  {
    label: '时间选择',
    field: 'dateRange',
    component: 'ARangePicker',
  },
  {
    label: '年龄',
    component: 'slot',
    slot: 'age',
  },
]

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    customRender: ({ index }) => `${index + 1}`,
  },
  {
    title: '客户名称',
    dataIndex: 'customerName',
  },
  {
    title: '所属项目',
    dataIndex: 'communityName',
  },
  {
    title: '电话',
    dataIndex: 'phone',
    customRender: ({ record }) => `${record.phone}`,
  },
  {
    title: '操作',
    dataIndex: 'action',
  },
]

//定义接口
const request = async (searchModel) => {
  return await window.$api.common.selectPageCoupon({ ...searchModel })
}

const onSearch = (searchModel) => {
  searchModel.startTime = searchModel.dateRange
    ? searchModel.dateRange[0].format('YYYY-MM-DD')
    : null
  searchModel.endTime = searchModel.dateRange ? searchModel.dateRange[1].format('YYYY-MM-DD') : null
  searchTable.value.onSearch({ ...searchModel, dateRange: null })
}

//编辑
const editRecord = (record) => {
  console.log(record)
}

//删除
const deleteRecord = (record) => {
  Modal.confirm({
    title: '确认删除吗？',
    icon: createVNode(ExclamationCircleOutlined, { style: 'color:#eb4444' }),
    content: '删除后该条记录不可恢复，是否确定删除？',
    onOk: () => {
      return $api.base.deleteRecord(record.id).then((res) => {
        if (res.ok) {
          message.success('删除成功')
          onSearch()
        } else {
          message.error('删除失败')
        }
      })
    },
  })
}

//弹窗
const dialog = ref(null)
const openDialog = () => {
  dialog.value.onShow({})
}
</script>

<style lang="less" scoped></style>
