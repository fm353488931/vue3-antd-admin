<template>
  <div class="user">
    <a-tabs v-model:activeKey="activeKey" force-render>
      <a-tab-pane key="1" tab="选角公司">
        <!-- <HeadList :tabActive="activeKey" v-if="activeKey == '1'" /> -->
        <RoleList :tabActive="activeKey" v-if="activeKey == '1'" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="审核列表" force-render>
        <!-- <HeadList :tabActive="activeKey" v-if="activeKey == '2'" /> -->
        <RoleList :tabActive="activeKey" v-if="activeKey == '2'" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script setup>
import RoleList from './components/RoleList.vue'
// import PerformanceTag from './components/PerformanceTag.vue'
const activeKey = ref('1')
</script>

<style scoped lang="less"></style>
