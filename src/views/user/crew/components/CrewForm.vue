<template>
  <div class="CrewForm">
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
      :labelCol="{ span: 4 }"
    >
      <a-form-item label="姓名" name="pass">
        <a-input v-model:value="form" autocomplete="off" />
      </a-form-item>
      <a-form-item label="联系方式" name="pass">
        <a-input v-model:value="form" autocomplete="off" />
      </a-form-item>
      <a-form-item label="公司名称" name="pass">
        <a-input v-model:value="form" autocomplete="off" />
      </a-form-item>
      <a-form-item label="邮箱" name="pass">
        <a-input v-model:value="form" autocomplete="off" />
      </a-form-item>
      <a-form-item label="职务" name="pass">
        <a-input v-model:value="form" autocomplete="off" />
      </a-form-item>
      <a-form-item label="邀请人" name="pass">
        <a-input v-model:value="form" autocomplete="off" />
      </a-form-item>
      <a-form-item label="账号状态" name="pass">
        <a-switch />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-space>
          <a-button type="primary" html-type="submit">确定</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">取消</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'CrewForm',
}
</script>
<script setup>
import { UploadOutlined } from '@ant-design/icons-vue'
const formRef = ref(null)
const form = reactive({})
const fileList = ref([])
const action = 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
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
