<template>
  <SearchForm :items="items" @onSearch="onSearch" @onReset="getList" />
  <SearchTable :request="getList" :columns="columns">
    <template #bodyCell="{ column, text, record }">
      <span v-if="column.dataIndex === 'action'">
        <a-space>
          <a href="javascript:;" @click="editRecord(record)">编辑</a>
          <a href="javascript:;" @click="deleteRecord(record)" class="danger">删除</a>
        </a-space>
      </span>
    </template>
  </SearchTable>
</template>

<script setup>
import SearchForm from '@/components/SearchForm.vue'
import SearchTable from '@/components/SearchTable.vue'
import $api from '@/api'

const items = [
  {
    label: '姓名',
    field: 'name',
    component: 'Input',
  },
  {
    label: '类型',
    field: 'type',
    component: 'Select',
    props: {
      options: [
        {
          label: '舒适性',
          value: 1,
        },
        {
          label: '经济性',
          value: 2,
        },
      ],
      onChange: (value, option) => {
        console.log(this)
      },
    },
  },
  {
    label: '预约时间',
    field: 'makeDate',
    component: 'DatePicker',
    componentProps: {},
  },
]
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '操作',
    dataIndex: 'action',
  },
]
const getList = async (res = { current: 1, size: 10 }, searchModel) => {
  return await $api.common.selectPageCoupon({ params: { ...res, ...searchModel } })
}
const onSearch = (searchModel) => {
  getList(undefined, searchModel)
}
const editRecord = (record) => {
  console.log(record)
}
const deleteRecord = (record) => {
  console.log(record)
}
</script>

<style lang="less" scoped></style>
