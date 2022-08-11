<template>
  <div class="group">
    <a-tabs v-model:activeKey="activeKey" force-render>
      <a-tab-pane key="1" tab="发布列表">
        <GroupList :tabActive="activeKey" v-if="activeKey == '1'" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="待审批" force-render>
        <GroupList :tabActive="activeKey" v-if="activeKey == '2'" />
      </a-tab-pane>
      <a-tab-pane key="3" tab="草稿箱" force-render>
        <GroupList :tabActive="activeKey" v-if="activeKey == '3'" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script setup>
import GroupList from './components/GroupList.vue'
// import PerformanceTag from './components/PerformanceTag.vue'
const activeKey = ref('1')
</script>

<style scoped lang="less"></style>
