<template>
  <div class="user">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="群演列表">
        <PerformanceList />
      </a-tab-pane>
      <a-tab-pane key="2" tab="群演推荐" force-render> 2 </a-tab-pane>
      <a-tab-pane key="3" tab="群演标签" force-render>
        <PerformanceTag />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script setup>
import PerformanceList from './components/PerformanceList.vue'
import PerformanceTag from './components/PerformanceTag.vue'
const activeKey = ref('1')
</script>

<style scoped lang="less"></style>
