<template>
  <SearchForm
    :items="items"
    @onSearch="onSearch"
    @onReset="searchTable.reload()"
    autoComplete="off"
  >
    <template #age="{ model, field }">
      <a-input-number v-model:value="model.ageStart" placeholder="请输入" />
      -
      <a-input-number v-model:value="model.ageEnd" placeholder="请输入" />
    </template>
  </SearchForm>
  <a-space class="mb-20">
    <a-button type="primary">
      <template #icon>
        <PlusOutlined />
      </template>
      新增
    </a-button>
  </a-space>
  <SearchTable ref="searchTable" :request="getList" :columns="columns">
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
import Constant from '../../enums/constant'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'

const searchTable = ref(null)

const items = [
  {
    label: '所属小区',
    field: 'communityId',
    component: 'Select',
    props: {
      fieldNames: {
        label: 'name',
        value: 'id',
      },
      onChange: (value, option) => {},
    },
  },
  {
    label: '性别',
    field: 'sex',
    component: 'Select',
    props: {
      options: Constant.options.sex,
      fieldNames: {
        label: 'label',
        value: 'value',
      },
    },
  },
  {
    label: '年龄',
    field: '',
    component: 'slot',
    slot: 'age',
  },
  {
    label: '搜索',
    field: 'keyword',
    component: 'Input',
    props: {
      placeholder: '根据姓名/联系方式/具体地址/档案负责人/档案负责人电话/备注模糊搜索',
      style: {
        width: '500px',
      },
    },
  },
]
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    customRender: ({ index }) => `${index + 1}`,
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '标签',
    dataIndex: 'label',
    customRender: ({ record }) => `${record.labelName.join('、')}`,
  },
  {
    title: '所属小区',
    dataIndex: 'communityName',
  },
  {
    title: '操作',
    dataIndex: 'action',
  },
]

const getList = async (res = { current: 1, size: 10 }, searchModel) => {
  return await $api.common.selectPageCoupon({ ...res, ...searchModel })
}
const onSearch = (searchModel) => {
  searchTable.value.getList(searchModel)
}

const editRecord = (record) => {
  console.log(record)
}
const deleteRecord = (record) => {
  Modal.confirm({
    title: '删除',
    icon: modal.createVNode(ExclamationCircleOutlined),
    content: '删除后人员信息将不可恢复，是否确定删除',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return $api.personnel.deleteCarePersonnel(record.id).then((res) => {
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
</script>

<style lang="less" scoped></style>
