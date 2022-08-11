<template>
  <div class="PerformanceTagForm">
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
      :labelCol="{ span: 4 }"
    >
      <a-form-item label="标签名" name="pass">
        <a-input v-model:value="form" autocomplete="off" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-space>
          <a-button @click="resetForm">取消</a-button>
          <a-button type="primary" html-type="submit">保存</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'PerformanceTagForm',
}
</script>
<script setup>
const formRef = ref(null)
const form = reactive({})
const rules = {}
const resetForm = () => {
  formRef.value.resetFields()
}
const handleFinish = (values) => {
  console.log(values, form)
}
const handleFinishFailed = (errors) => {
  console.log(errors)
}
</script>

<style scoped lang="less"></style>
