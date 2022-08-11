<template>
  <div class="bannerForm">
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      :labelCol="{ span: 4 }"
      ><!--       @submit="handleSubmit" -->
      <a-form-item label="名称" name="bannerName">
        <a-input :maxLength="15" v-model:value="form.bannerName" autocomplete="off" />
      </a-form-item>
      <a-form-item label="图片" name="fileList">
        <a-input v-model:value="form.fileList" autocomplete="off" />
      </a-form-item>
      <!-- <a-form-item label="图片" name="fileList">
        <a-upload v-model:file-list="form.fileList" :action="action">
          <a-button class="mb-10">
            <upload-outlined />
            上传
          </a-button>
          <div>支持上传.jpg、.jpeg、.png格式图片，图片大小不超过5m</div>
        </a-upload>
      </a-form-item> -->
      <a-form-item label="外链地址">
        <a-input v-model:value="form.outerLink" autocomplete="off" />
      </a-form-item>
      <a-form-item label="是否上架" name="state">
        <a-switch v-model:checked="form.state" />
      </a-form-item>
      <a-form-item label="是否置顶" name="isTopping">
        <a-switch v-model:checked="form.isTopping" />
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
  name: 'BannerForm',
}
</script>
<script setup>
// import { UploadOutlined } from '@ant-design/icons-vue'
import $api from '@/api'
const $message = inject('$message')
const emits = defineEmits(['cancel'])
const formRef = ref(null)
const form = ref({
  id: undefined,
  fileList: 'http://gt-fe.oss-cn-beijing.aliyuncs.com/img/c4024340156b11ed8e292d348df7298b.png',
  // fileList: [],
  bannerName: '',
  bannerUrl: '',
  outerLink: '',
  state: true,
  isTopping: false,
})
// const fileList = ref([])
// const action = 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
const rules = {
  bannerName: [{ required: true, message: '请输入名称', trigger: 'change' }],
  fileList: [{ required: true, message: '请上传图片', trigger: 'change' }],
  outerLink: [{ required: true, message: '请上传图片', trigger: 'change' }],
  state: [{ required: true, message: '请上传图片', trigger: 'change' }],
  isTopping: [{ required: true, message: '请上传图片', trigger: 'change' }],
}
const onEdit = (id) => {
  $api.banner.getById(id).then((res) => {
    const val = res.data
    form.value = {
      bannerName: val.bannerName,
      bannerUrl: val.fileList,
      outerLink: val.outerLink,
      state: val.state == 1 ? true : false,
      isTopping: val.isTopping ? true : false,
    }
    console.log(res)
  })
}
const resetForm = () => {
  formRef.value.resetFields()
}
const onFinish = () => {
  const val = form.value
  const params = {
    bannerName: val.bannerName,
    bannerUrl: val.fileList,
    outerLink: val.outerLink,
    state: val.state ? 1 : 0,
    isTopping: val.isTopping ? 1 : 0,
  }
  $api.banner.add(params).then(() => {
    $message.success('新增成功')
    emits('cancel')
  })
}
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
defineExpose({
  onEdit,
})
</script>

<style scoped lang="less"></style>
