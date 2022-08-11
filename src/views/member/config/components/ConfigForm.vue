<template>
  <div class="ConfigForm">
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      :labelCol="{ span: 5 }"
    >
      <a-form-item label="套餐名称" name="typeName">
        <a-input :maxLength="15" v-model:value="form.typeName" autocomplete="off" />
      </a-form-item>
      <a-form-item label="原价金额" name="originalPrice">
        <a-input-number
          :max="9999999999"
          :min="0"
          :precision="2"
          v-model:value="form.originalPrice"
          autocomplete="off"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="折扣金额" name="discountAmount">
        <a-input-number
          :max="9999999999"
          :min="0"
          :precision="2"
          v-model:value="form.discountAmount"
          autocomplete="off"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="实付金额">
        <a-input disabled v-model:value="realMoney" autocomplete="off" />
      </a-form-item>
      <a-form-item label="套餐天数" name="days">
        <a-input-number
          :max="99999"
          :min="0"
          :precision="0"
          v-model:value="form.days"
          autocomplete="off"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="通告置顶数/月" name="topDays">
        <a-input-number
          :max="30"
          :min="0"
          :precision="0"
          v-model:value="form.topDays"
          autocomplete="off"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-space>
          <a-button style="margin-left: 10px" @click="resetForm">取消</a-button>
          <a-button type="primary" html-type="submit">保存</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'ConfigForm',
}
</script>
<script setup>
// import { UploadOutlined } from '@ant-design/icons-vue'
const formRef = ref(null)
const form = ref({
  typeName: '',
  originalPrice: null,
  discountAmount: null,
  days: null,
  topDays: null,
})
const realMoney = computed(() => {
  console.log(form.originalPrice)
  console.log(form.discountAmount)
  console.log(form.originalPrice - form.discountAmount)
  return form.value.originalPrice - form.value.discountAmount
})
// const fileList = ref([])
// const action = 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
const rules = {}
const resetForm = () => {
  formRef.value.resetFields()
}
const onFinish = (values) => {
  const val = form.value
  const params = {
    typeName: val.typeName,
    originalPrice: val.originalPrice,
    discountAmount: val.discountAmount,
    days: val.days,
    topDays: val.topDays,
  }
  $api.member.add(params).then(() => {
    $message.success('新增成功')
    emits('cancel')
  })
}
const onFinishFailed = (errors) => {
  console.log(errors)
}
</script>

<style scoped lang="less"></style>
