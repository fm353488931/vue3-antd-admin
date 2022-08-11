<template>
  <a-layout class="layout">
    <a-layout-header />
    <a-layout>
      <a-layout-sider theme="light" :trigger="null" collapsible>
        <Menu />
      </a-layout-sider>
      <a-layout-content>
        <MainView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup>
import MainView from './mainView/index.vue'
import Menu from './menu/index.vue'
</script>
<style lang="less" scoped>
.layout {
  height: 100%;

  .ant-layout-header {
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    height: 48px;
    background-image: linear-gradient(180deg, #3b4048 0%, #262a30 100%);
  }

  .ant-layout-sider {
    flex: 0 0 1.8rem !important;
    max-width: 1.8rem !important;
    min-width: 1.8rem !important;
    width: 1.8rem !important;
  }

  .ant-layout {
    background: #f6f8fa;
    .ant-layout-content {
      margin: 16px;
      padding: 16px;
      background: #ffffff;
      overflow: auto;
    }
  }
}
</style>
