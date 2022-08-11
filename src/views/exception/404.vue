<template>
  <a-result status="404" title="404" sub-title="抱歉，你访问的页面不存在">
    <template #extra>
      <a-button type="primary" @click="goHome">回到首页</a-button>
    </template>
  </a-result>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>

<style lang="less" scoped></style>
