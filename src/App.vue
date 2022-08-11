<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>
<script setup>
import { debounce } from 'lodash'
import App from '@/utils/init'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

const locale = zhCN

onMounted(() => {
  window.addEventListener('resize', debounce(App.setRootFont, 80))
})

onUnmounted(() => {
  window.removeEventListener('resize')
})
</script>
<style lang="less" scoped></style>
