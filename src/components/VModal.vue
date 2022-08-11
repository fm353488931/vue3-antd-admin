<template>
  <a-modal
    ref="modalRef"
    v-model:visible="visible"
    @ok="handleOk"
    :title="props.title"
    :footer="props.footer"
  >
    <!-- <template #title>
    </template> -->
    <slot name="content"></slot>
  </a-modal>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '标题',
  },
  footer: {
    type: Boolean,
    default: false,
  },
})
const visible = ref(false)
const onShow = () => {
  visible.value = true
}
const onClose = () => {
  visible.value = false
}
const handleOk = () => {}
defineExpose({
  onShow,
  onClose,
})
</script>

<style scoped lang="less"></style>
