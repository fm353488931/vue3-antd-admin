<template>
  <Teleport to="body">
    <div class="dialog" ref="dialog">
      <div class="dialog_header">
        <img src="../assets/icons/dialog.png" alt="" />
        <span class="title">弹窗title</span>
        <close-outlined style="cursor: pointer" @click="onClose" />
      </div>
      <div class="dialog_content">
        <div v-if="isEdit" style="border: 0.01rem solid #ccc">
          <Toolbar
            style="border-bottom: 0.01rem solid #ccc"
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            mode="default"
          />
          <Editor
            style="height: 5rem; overflow-y: hidden"
            v-model="valueHtml"
            :defaultConfig="editorConfig"
            mode="default"
            @onCreated="handleCreated"
          />
        </div>
        <div v-else v-html="currentItem.introduceText" class="introduceText"></div>
      </div>
      <div class="dialog_footer">
        <a-space>
          <a-button v-if="isEdit" @click="onCloseEdit">关闭</a-button>
          <a-button type="primary" v-if="!isEdit" @click="onEdit">编辑</a-button>
          <a-button type="primary" v-if="isEdit" @click="onSave" :loading="loading">保存</a-button>
        </a-space>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import request from '@/utils/request'

import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import { CloseOutlined } from '@ant-design/icons-vue'
const emit = defineEmits(['refresh'])
const dialog = ref(null)
const CSSStyleDeclaration = ref(null)
onMounted(() => {
  CSSStyleDeclaration.value = dialog.value.style
})

const token = ref('')
const getToken = () => {
  window.$api.getToken().then((res) => {
    token.value = res.data.token
    editorConfig.MENU_CONF['uploadImage'].headers.Authorization = 'Bearer ' + token.value
    editorConfig.MENU_CONF['uploadVideo'].headers.Authorization = 'Bearer ' + token.value
  })
}
getToken()

const currentItem = ref({})
const onShow = (item) => {
  currentItem.value = item
  CSSStyleDeclaration.value.transform = 'translate(-50%, -50%) scale(0)'
  setTimeout(() => {
    CSSStyleDeclaration.value.transform = 'translate(-50%, -50%) scale(1)'
  }, 100)
}
const onClose = () => {
  CSSStyleDeclaration.value.transform = 'translate(-50%, -50%) scale(0)'
  isEdit.value = false
  valueHtml.value = ''
  const dialog_content = document.querySelector('.dialog_content')
  dialog_content.scrollTop = 0
}

const loading = ref(false)
const isEdit = ref(false)

//编辑
const onEdit = () => {
  isEdit.value = true
  valueHtml.value = currentItem.value.introduceText
}
//关闭
const onCloseEdit = () => {
  isEdit.value = false
  valueHtml.value = ''
}
//保存
const onSave = () => {
  const form = {
    introduceClass: currentItem.value.introduceClass,
    introduceChildClass: currentItem.value.introduceChildClass,
    introduceText: valueHtml.value,
  }
  loading.value = true
  window.$api
    .gongFuIntroduceSet(form)
    .then(() => {
      isEdit.value = false
      currentItem.value.introduceText = valueHtml.value
      window.$message.success('保存成功')
      emit('refresh')
    })
    .finally(() => {
      loading.value = false
    })
}

//富文本
const editorRef = shallowRef()
const valueHtml = ref('')
const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...', MENU_CONF: {} }
editorConfig.MENU_CONF['uploadImage'] = {
  server: `${request.defaults.baseURL}/base/files/upload`,
  fieldName: 'file',
  maxFileSize: 100 * 1024 * 1024,
  allowedFileTypes: ['image/*'],
  meta: {},
  metaWithUrl: false,
  headers: {
    Authorization: token.value,
  },
  withCredentials: true,
  timeout: 30 * 1000,
  customInsert(res, insertFn) {
    insertFn(res.data.url, res.data.name, res.data.href)
  },
}
editorConfig.MENU_CONF['uploadVideo'] = {
  server: `${request.defaults.baseURL}/base/files/upload`,
  fieldName: 'file',
  maxFileSize: 50 * 1024 * 1024,
  maxNumberOfFiles: 3,
  allowedFileTypes: ['video/*'],
  meta: {},
  metaWithUrl: false,
  headers: {
    Authorization: token.value,
  },
  withCredentials: true,
  timeout: 60 * 1000,
  customInsert(res, insertFn) {
    insertFn(res.data.url, 'poster')
  },
}

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor
}
defineExpose({
  onShow,
  onClose,
})
</script>

<style lang="less">
.introduceText {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #fff;
  }
  img {
    max-width: 100%;
  }
}
</style>

<style lang="less" scoped>
.dialog {
  position: absolute;
  left: 50%;
  top: 50%;
  transition: all ease 0.2s;
  transform: translate(-50%, -50%) scale(0);
  z-index: 99;
  display: flex;
  flex-direction: column;
  color: #ffffff;
  width: 9rem;
  height: 5.8rem;
  border-top: 0.03rem solid #abd6ff;
  border-bottom: 0.03rem solid #abd6ff;
  border-left: 0.02rem solid rgba(#abd6ff, 0.32);
  border-right: 0.02rem solid rgba(#abd6ff, 0.32);
  background: linear-gradient(180deg, rgba(15, 38, 68, 0.9) 2%, rgba(10, 45, 90, 0.9) 99%);
  &_header {
    display: flex;
    align-items: center;
    padding-left: 0.18rem;
    padding-right: 0.15rem;
    height: 0.5rem;
    border-bottom: 0.01rem solid #acd6ff;
    .title {
      flex: 1;
      display: inline-block;
      margin-left: 0.08rem;
      font-weight: 500;
      font-size: 0.2rem;
      color: #ffffff;
      text-shadow: 0 0.02rem 0.02rem #101017;
    }
    img {
      width: 0.28rem;
      height: 0.28rem;
    }
    i {
      margin-left: auto;
      font-size: 0.18rem;
      cursor: pointer;
    }
  }
  &_content {
    flex: 1;
    padding: 0.24rem;
    width: 100%;
    overflow-y: auto;
  }
  &_footer {
    display: flex;
    justify-content: center;
    padding: 0.16rem;
  }
}
</style>
