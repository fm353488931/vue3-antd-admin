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
          :is="getComponent(item.component)"
          v-bind="getComponentProps(item)"
          v-model:value="formModel[item.field]"
        />
      </a-form-item>
      <a-space style="margin-left: auto">
        <a-button @click="onReset">重置</a-button>
        <a-button @click="onSearch" type="primary">查询</a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script setup>
import { resolveComponent } from 'vue'
const getComponent = (component) => {
  return resolveComponent(component)
}
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['onSearch', 'onReset'])

const searchForm = ref(null)
let formModel = ref({})

const getComponentProps = (item) => {
  return {
    style: { width: '280px' },
    allowClear: true,
    placeholder: createPlaceholder(item),
    autoComplete: 'off',
    ...item.props,
  }
}

const createPlaceholder = ({ component, label }) => {
  let placeholder = undefined
  if (component === 'AInput' || component === 'AInputNumber') placeholder = '请输入' + label
  if (
    ['APicker', 'ASelect', 'ACheckbox', 'ARadio', 'ASwitch', 'ADatePicker', 'ATimePicker'].includes(
      component
    )
  ) {
    placeholder = '请选择' + label
  }
  return placeholder
}
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

defineExpose({
  formModel,
})
</script>

<style lang="less" scoped>
.SearchForm {
  .ant-form {
    display: flex;
    align-items: flex-start;
    .ant-form-item {
      margin-bottom: 20px;
    }
  }
}
</style>
