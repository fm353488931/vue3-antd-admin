<template>
  <div class="SensitiveForm">
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
      :labelCol="{ span: 4 }"
    >
      <a-form-item label="脱敏词汇" name="pass">
        <a-input v-model:value="form" autocomplete="off" />
      </a-form-item>
      <a-form-item label="启用状态" name="pass">
        <a-switch />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button style="margin-left: 10px" @click="resetForm">取消</a-button>
        <a-button type="primary" html-type="submit">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'SensitiveForm',
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
