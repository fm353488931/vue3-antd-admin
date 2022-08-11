<template>
  <div class="vApprovalForm">
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
      :labelCol="{ span: 4 }"
    >
      <a-form-item label="处理结果" name="pass">
        <a-radio-group v-model:value="form" :options="Enums.options.result" />
      </a-form-item>
      <a-form-item label="审批意见" name="pass">
        <a-input v-model:value="form" autocomplete="off" />
      </a-form-item>
      <a-form-item label="审批附件" name="checkPass">
        <a-upload v-model:file-list="fileList" :action="action">
          <a-button class="mb-10">
            <upload-outlined />
            上传
          </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-space>
          <a-button @click="resetForm">取消</a-button>
          <a-button type="primary" html-type="submit">确认</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'VApprovalForm',
}
</script>
<script setup>
import { UploadOutlined } from '@ant-design/icons-vue'
import Enums from '@/enums/constant.js'
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
