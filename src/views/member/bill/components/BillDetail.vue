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
      <a-form-item label="套餐" name="pass">
        <a-input v-model:value="form" autocomplete="off" disabled />
      </a-form-item>
      <a-form-item label="支付时间" name="pass">
        <a-input v-model:value="form" autocomplete="off" disabled />
      </a-form-item>
      <a-form-item label="付款人" name="pass">
        <a-input v-model:value="form" autocomplete="off" disabled />
      </a-form-item>
      <a-form-item label="手机号" name="pass">
        <a-input v-model:value="form" autocomplete="off" disabled />
      </a-form-item>
      <a-form-item label="套餐金额" name="pass">
        <a-input v-model:value="form" autocomplete="off" disabled />
      </a-form-item>
      <a-form-item label="支付金额" name="pass">
        <a-input v-model:value="form" autocomplete="off" disabled />
      </a-form-item>
      <a-form-item label="折扣金额" name="pass">
        <a-input v-model:value="form" autocomplete="off" disabled />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button style="margin-left: 10px" @click="resetForm">返回</a-button>
        <!-- <a-button type="primary" html-type="submit">保存</a-button> -->
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
