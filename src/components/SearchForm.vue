<template>
  <div class="SearchForm">
    <a-form layout="inline" :model="formModel" ref="searchForm">
      <a-form-item
        v-for="(item, index) in props.items"
        :key="index"
        :label="item.label"
        :name="item.field"
      >
        <!--判断插槽-->
        <template v-if="item.slot">
          <slot
            :name="item.slot"
            :model="formModel"
            :field="item.field"
            :value="formModel[item.field]"
          ></slot>
        </template>
        <component
          v-else
          :is="componentMap[item.component]"
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
import {
  Input,
  InputNumber,
  Select,
  DatePicker,
  RangePicker,
  TimePicker,
  Radio,
  Cascader,
} from 'ant-design-vue'
const componentMap = {
  Input,
  InputNumber,
  Select,
  DatePicker,
  RangePicker,
  TimePicker,
  Radio,
  Cascader,
}
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})

const searchForm = ref(null)
let formModel = ref({})

const getComponentProps = (item) => {
  return {
    style: 'width:250px',
    allowClear: true,
    placeholder: createPlaceholder(item),
    ...item.props,
  }
}
//创建提示语
const createPlaceholder = ({ component, label }) => {
  let placeholder = undefined
  if (component === 'Input' || component === 'InputNumber') {
    placeholder = `请输入${label}`
  }
  if (
    [
      'Picker',
      'Select',
      'Checkbox',
      'Radio',
      'Switch',
      'DatePicker',
      'RangePicker',
      'TimePicker',
    ].includes(component)
  ) {
    placeholder = `请选择${label}`
  }
  return placeholder
}

const emit = defineEmits(['onSearch', 'onReset'])
//点击查询
const onSearch = () => {
  emit('onSearch', formModel.value)
}
//点击重置
const onReset = () => {
  searchForm.value.resetFields()
  formModel.value = {}
  emit('onReset')
}
</script>

<style lang="less" scoped>
.SearchForm {
  .ant-form-inline .ant-form-item {
    margin-bottom: 24px;
  }
}
</style>
