<template>
  <div class="SearchForm">
    <a-form layout="inline" :model="formModel" ref="searchForm">
      <a-form-item
        v-for="(item, index) in props.items"
        :key="index"
        :label="item.label"
        :name="item.field"
      >
        <component
          :is="getComponent(item.component)"
          v-bind="getComponentProps(item)"
          v-model:value="formModel[item.field]"
        />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button @click="onSearch" type="primary">查询</a-button>
          <a-button @click="onReset">重置</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup>
import { Input, InputNumber, Select, DatePicker, Radio, Cascader, TimePicker } from 'ant-design-vue'
const componentMap = {
  Input,
  InputNumber,
  Select,
  DatePicker,
  Radio,
  Cascader,
  TimePicker,
}
const getComponent = (component) => {
  return componentMap[component]
}
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['onSearch', 'onReset'])

const searchForm = ref(null)
const formModel = reactive({})

const getComponentProps = (item) => {
  return {
    style: 'width:250px',
    allowClear: true,
    placeholder: createPlaceholder(item.component) + item.label,
    ...item.props,
  }
}

const createPlaceholder = (component) => {
  if (component === 'Input' || component === 'InputNumber') return '请输入'
  if (
    ['Picker', 'Select', 'Checkbox', 'Radio', 'Switch', 'DatePicker', 'TimePicker'].includes(
      component
    )
  ) {
    return '请选择'
  }
  return ''
}
//点击查询
const onSearch = () => {
  emit('onSearch', formModel)
}
//点击重置
const onReset = () => {
  searchForm.value.resetFields()
  emit('onReset')
}
</script>

<style lang="less" scoped>
.SearchForm {
}
</style>
