<template>
  <div class="user">
    <a-tabs v-model:activeKey="activeKey" force-render>
      <a-tab-pane key="1" tab="群头列表">
        <HeadList :tabActive="activeKey" v-if="activeKey == '1'" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="审核列表" force-render>
        <HeadList :tabActive="activeKey" v-if="activeKey == '2'" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script setup>
import HeadList from './components/HeadList.vue'
// import PerformanceTag from './components/PerformanceTag.vue'
const activeKey = ref('1')
</script>

<style scoped lang="less"></style>
