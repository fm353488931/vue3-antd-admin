<template>
  <Teleport :disabled="position === 'absolute'" to="body">
    <div class="mask" ref="mask" v-show="isShow">
      <div class="dialog" ref="dialog">
        <div class="dialog_header">
          <img :src="icon" alt="" class="mr-12" />
          <p class="dialog_header_title">{{ title }}</p>
          <close-outlined style="cursor: pointer" @click="onClose" />
        </div>
        <div class="dialog_content">
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { CloseOutlined } from '@ant-design/icons-vue'
const emit = defineEmits(['close'])
const mask = ref(null)
const dialog = ref(null)
const dialogStyle = ref(null)
const maskStyle = ref(null)
const isShow = ref(false)
const title = ref('')
const icon = ref(new URL('../../../assets/icons/dangjianxinwen.webp', import.meta.url).href)
const position = ref('')
onMounted(() => {
  mask.value.addEventListener(
    'click',
    () => {
      onClose()
    },
    false
  )
  dialog.value.addEventListener(
    'click',
    (e) => {
      e.stopPropagation()
    },
    false
  )
  dialogStyle.value = dialog.value.style
  maskStyle.value = mask.value.style
})

const onShow = (obj) => {
  isShow.value = true
  title.value = obj.title
  icon.value = obj.icon
  position.value = obj.position
  if (position.value === 'absolute') {
    mask.value.className = ''
    dialogStyle.value.bottom = '1.2rem'
    dialogStyle.value.top = 'initial'
  }
  dialogStyle.value.width = obj.width
  dialogStyle.value.height = obj.height
  dialogStyle.value.transform = 'translate(-50%, -50%) scale(0)'
  setTimeout(() => {
    if (position.value === 'absolute') {
      dialogStyle.value.transform = 'translate(-50%, 0%) scale(1)'
    } else {
      dialogStyle.value.transform = 'translate(-50%, -50%) scale(1)'
    }
  }, 100)
}
const onClose = () => {
  isShow.value = false
  dialogStyle.value.transform = 'translate(-50%, -50%) scale(0)'
  const dialog_content = document.querySelector('.dialog_content')
  dialog_content.scrollTop = 0
  emit('close')
}

const loading = ref(false)

defineExpose({
  onShow,
  onClose,
})
</script>

<style lang="less" scoped>
.mask {
  position: fixed;
  // background-color: rgba(0, 0, 0, 0.4);
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
}
.dialog {
  font-size: 0.2rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transition: all ease 0.2s;
  transform: translate(-50%, -50%) scale(0);
  z-index: 99;
  display: flex;
  flex-direction: column;
  color: #ffffff;
  width: 9.6rem;
  height: 6.72rem;
  padding: 0.12rem;
  background-image: url(../assets/imgs/dialog_bg.webp);
  background-size: 100% 100%;
  &_header {
    display: flex;
    align-items: center;
    padding: 0 0.24rem;
    width: 100%;
    height: 0.58rem;
    background-image: url(../assets/imgs/dialog_header.webp);
    background-size: 100% 100%;
    &_title {
      margin-right: auto;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      font-size: 0.24rem;
      color: #ffffff;
      text-shadow: 0 0 0.08rem #2c8df4;
    }
  }
  &_content {
    flex: 1;
    padding: 0.3rem 0.18rem 0;
    width: 100%;
    overflow-y: auto;
  }
}
</style>
