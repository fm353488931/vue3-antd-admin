<template>
  <a-result status="500" title="500" sub-title="抱歉，服务器出错了">
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
