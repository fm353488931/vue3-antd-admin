<template>
  <Teleport :disabled="position === 'absolute'" to="body">
    <Transition name="modal">
      <div class="dialog_mask" ref="mask" v-if="isShow" @blur="onClose">
        <div class="dialog_container">
          <div class="dialog_container_header">
            <img :src="icon" alt="" class="mr-12" />
            <span class="dialog_container_header_title">{{ props.title || '标题' }}</span>
            <close-outlined style="cursor: pointer" @click="onClose" />
          </div>
          <div class="dialog_container_body">
            <slot></slot>
          </div>
          <div class="dialog_container_footer">
            <slot name="footer">
              <a-space>
                <a-button type="primary" @click="onClose">确定</a-button>
                <a-button @click="onClose">取消</a-button>
              </a-space>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { CloseOutlined } from '@ant-design/icons-vue'
const props = defineProps({
  title: String,
})
const emit = defineEmits(['close'])
const mask = ref(null)
const isShow = ref(false)
// const icon = ref(new URL('../assets/icons/dialog.png', import.meta.url).href)
const position = ref('')

const onShow = (obj) => {
  isShow.value = true
}
const onClose = () => {
  isShow.value = false
  emit('close')
}

defineExpose({
  onShow,
  onClose,
})
</script>

<style lang="less" scoped>
.dialog {
  &_mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
  }
  &_container {
    box-sizing: border-box;
    position: relative;
    top: 15vh;
    margin: 0 auto;
    width: 5.2rem;
    max-width: calc(100vw - 0.32rem);
    background-color: #fff;
    border-radius: 0.02rem;
    box-shadow: 0 0.03rem 0.06rem -0.04rem #0000001f, 0 0.06rem 0.16rem #00000014,
      0 0.09rem 0.28rem 0.08rem #0000000d;
    transition: all 0.3s ease;
    pointer-events: auto;
    &_header {
      display: flex;
      align-items: center;
      border-bottom: 0.01rem solid #f0f0f0;
      padding: 0 0.24rem;
      height: 0.55rem;
      &_title {
        margin-right: auto;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        font-size: 0.16rem;
        color: @gray26;
      }
    }
    &_body {
      padding: 0.24rem;
      word-wrap: break-word;
    }
    &_footer {
      display: flex;
      justify-content: flex-end;
      padding: 0.1rem 0.16rem;
      border-top: 0.01rem solid #f0f0f0;
    }
  }
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .dialog_container,
.modal-leave-to .dialog_container {
  transform: scale(1.1);
}
</style>
